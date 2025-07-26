using Microsoft.Extensions.Options;
using System.Text;
using System.Text.Json;

namespace query_ai.Gemini.Integration;

public sealed class GeminiClient : IGeminiClient
{
    private readonly HttpClient _http;
    private readonly GeminiSettings _settings;
    private readonly JsonSerializerOptions _jsonOpts = new() { PropertyNameCaseInsensitive = true };

    public GeminiClient(HttpClient http, IOptions<GeminiSettings> settings)
    {
        _http = http ?? throw new ArgumentNullException(nameof(http));
        _settings = settings?.Value ?? throw new ArgumentNullException(nameof(settings));
        if (string.IsNullOrWhiteSpace(_settings.ApiKey))
            throw new ArgumentException("Gemini API key is not configured.", nameof(settings));
    }

    public async Task<GeminiResult> GenerateAsync(string userMessage, string userId, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(userMessage))
            throw new ArgumentException("User message cannot be null or empty.", nameof(userMessage));

        try
        {
            var payload = BuildPayload(userMessage, userId);
            var url = $"https://generativelanguage.googleapis.com/v1beta/models/{_settings.Model}:generateContent?key={_settings.ApiKey}";

            using var req = new HttpRequestMessage(HttpMethod.Post, url)
            {
                Content = new StringContent(JsonSerializer.Serialize(payload, _jsonOpts), Encoding.UTF8, "application/json")
            };

            using var res = await _http.SendAsync(req, ct);
            var body = await res.Content.ReadAsStringAsync(ct);

            if (!res.IsSuccessStatusCode)
                throw new GeminiHttpException((int)res.StatusCode, body);

            return ParseResponse(body);
        }
        catch (TaskCanceledException ex) when (!ct.IsCancellationRequested)
        {
            throw new TimeoutException("The request to Gemini API timed out.", ex);
        }
        catch (JsonException ex)
        {
            throw new GeminiResponseParseException("Failed to parse Gemini response.", ex);
        }
        catch (HttpRequestException ex)
        {
            throw new GeminiHttpException(0, $"Network error: {ex.Message}");
        }
    }

    private static object BuildPayload(string userMessage, string userId) =>
        new
        {
            contents = new[]
            {
                new { role = "user", parts = new[] { new { text = userMessage } } }
            },
            tools = new[]
            {
                new
                {
                    functionDeclarations = new[]
                    {
                        new
                        {
                            name = "run_sql",
                            description = "Generate a SELECT-only query for the Expense table.",
                            parameters = new
                            {
                                type = "object",
                                properties = new { sql = new { type = "string" } },
                                required = new [] { "sql" }
                            }
                        }
                    }
                }
            },
            system_instruction = new
            {
                role = "system",
                parts = new[]
                {
                    new { text = GetSystemPrompt(userId) }
                }
            }
        };

    private static string GetSystemPrompt(string userId) => $@"
You are a friendly personal finance assistant AI for user {userId}.

Behavior:
- If the user greets (hello, hi, hey, good morning), reply with a friendly greeting: ""Hello! How can I assist you today?""
- Only answer questions about their finances: expenses, spending, payments, transactions.
- For finance questions, generate SQL SELECT queries on the ""expenses"" table (schema below).
- For non-finance questions after greeting, respond: ""I can assist only with finance-related queries about your expenses and transactions.""

Database schema:
- Table: ""expenses""
- Columns:
  - ""Id"" (int)
  - ""ExpenseId"" (Guid)
  - ""Category"" (string)
  - ""Amount"" (decimal)
  - ""EntryDate"" (date)
  - ""CreatedAt"" (datetime)
  - ""PaymentMethod"" (string)
  - ""Notes"" (string)
  - ""UserId"" (string)

Rules:
- Only generate SQL SELECT queries on the ""Expenses"" table.
- Always filter by ""UserId"" = '{userId}' (case-sensitive).
- Use double quotes around table and column names with exact casing.
- Date filters should be inclusive using 'EntryDate'.
- Return only SQL or a polite text response if the query is non-finance.
- Always use the exact {userId} in your queries.

Examples:

User: ""Hello""
Assistant: ""Hello! How can I assist you today?""

User: ""What did I spend on groceries last month?""
Assistant SQL:
SELECT * FROM ""expenses"" WHERE ""UserId"" = '{userId}' AND ""Category"" = 'Groceries' AND ""EntryDate"" >= '2025-06-01' AND ""EntryDate"" <= '2025-06-30'

User: ""Who won the game yesterday?""
Assistant: ""I can assist only with finance-related queries about your expenses and transactions.""

End of instructions.
";

    private GeminiResult ParseResponse(string json)
    {
        try
        {
            using var doc = JsonDocument.Parse(json);
            if (!doc.RootElement.TryGetProperty("candidates", out var candidates))
                throw new GeminiResponseParseException("Missing 'candidates' in response.");

            var parts = candidates[0].GetProperty("content").GetProperty("parts");
            foreach (var part in parts.EnumerateArray())
            {
                if (part.TryGetProperty("functionCall", out var fn))
                {
                    var sql = fn.GetProperty("args").GetProperty("sql").GetString();
                    return GeminiResult.SqlResp(sql ?? "");
                }
            }
            return GeminiResult.TextResp(parts[0].GetProperty("text").GetString() ?? "");
        }
        catch (Exception ex) when (ex is not GeminiResponseParseException)
        {
            throw new GeminiResponseParseException("Error while parsing Gemini API response.", ex);
        }
    }
}
