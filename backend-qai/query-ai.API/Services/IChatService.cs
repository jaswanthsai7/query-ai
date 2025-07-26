using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using query_ai.API.Models;
using query_ai.API.Repositories;
using query_ai.Gemini.Integration;

namespace query_ai.API.Services
{
    public interface IChatService
    {
        Task<(string ChatMessage, List<Expense> Data)> HandleUserMessageAsync(string userMessage, string userId, CancellationToken ct = default);
    }

    public class ChatService : IChatService
    {
        private readonly IGeminiClient _geminiClient;
        private readonly IExpenseRepository _expenseRepository;

        public ChatService(IGeminiClient geminiClient, IExpenseRepository expenseRepository)
        {
            _geminiClient = geminiClient;
            _expenseRepository = expenseRepository;
        }

        public async Task<(string ChatMessage, List<Expense> Data)> HandleUserMessageAsync(string userMessage, string userId, CancellationToken ct = default)
        {
            var geminiResult = await _geminiClient.GenerateAsync(userMessage, userId, ct);

            if (geminiResult.Kind == GeminiResponseKind.Sql)
            {
                var sql = geminiResult.Sql;

                // Optional: Validate SQL here (ensure SELECT only, no dangerous keywords)
                if (string.IsNullOrWhiteSpace(sql) || !sql.TrimStart().StartsWith("SELECT", System.StringComparison.OrdinalIgnoreCase))
                    return ("Invalid or unsafe SQL query generated.", new List<Expense>());

                var data = await _expenseRepository.RunSqlQueryAsync(sql);

                var replyMessage = data.Count == 0
                    ? "No expenses found for your query."
                    : $"I found {data.Count} expense(s) matching your query.";

                return (replyMessage, data);
            }
            else
            {
                return (geminiResult.Text ?? "Sorry, I couldn't understand your request.", new List<Expense>());
            }
        }
    }
}
