namespace query_ai.Gemini.Integration;

public sealed class GeminiHttpException : Exception
{
    public int StatusCode { get; }
    public string ResponseBody { get; }

    public GeminiHttpException(int statusCode, string responseBody)
        : base($"Gemini API request failed with HTTP {statusCode}. Response: {TrimResponse(responseBody)}")
    {
        StatusCode = statusCode;
        ResponseBody = responseBody;
    }

    private static string TrimResponse(string response) =>
        string.IsNullOrEmpty(response)
            ? string.Empty
            : (response.Length > 300 ? response.Substring(0, 300) + "..." : response);
}
