namespace query_ai.Gemini.Integration;

public interface IGeminiClient
{
    Task<GeminiResult> GenerateAsync(string userMessage, string userId, CancellationToken ct = default);
}
