namespace query_ai.Gemini.Integration
{
    public sealed class GeminiSettings
    {
        public string ApiKey { get; set; } = "AIzaSyAFVGuxhF9OYARja030oqRRhq3KZBNYlLo";
        public string Model { get; set; } = "gemini-2.5-pro";
        public int TimeoutSeconds { get; set; } = 15;
    }

}
