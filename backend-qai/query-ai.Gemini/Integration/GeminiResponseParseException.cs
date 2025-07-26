namespace query_ai.Gemini.Integration;

public sealed class GeminiResponseParseException : Exception
{
    public GeminiResponseParseException() { }

    public GeminiResponseParseException(string message) : base(message) { }

    public GeminiResponseParseException(string message, Exception innerException)
        : base(message, innerException) { }
}
