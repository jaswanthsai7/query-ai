namespace query_ai.Gemini.Integration;

public enum GeminiResponseKind { Text, Sql }

public sealed class GeminiResult
{
    public GeminiResponseKind Kind { get; init; }
    public string? Text { get; init; }
    public string? Sql { get; init; }

    public static GeminiResult TextResp(string text) => new() { Kind = GeminiResponseKind.Text, Text = text };
    public static GeminiResult SqlResp(string sql) => new() { Kind = GeminiResponseKind.Sql, Sql = sql };
}
