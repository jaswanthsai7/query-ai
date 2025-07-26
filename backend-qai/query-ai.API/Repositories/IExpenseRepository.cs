using query_ai.API.Models;

namespace query_ai.API.Repositories
{

    public interface IExpenseRepository
    {
        Task<Expense> AddAsync(Expense expense, CancellationToken ct = default);
        Task<Expense?> GetByGuidAsync(string userId, Guid expenseId, CancellationToken ct = default);
        Task<IReadOnlyList<Expense>> GetByUserAsync(
            string userId,
            DateTime? from = null,
            DateTime? to = null,
            string? category = null,
            CancellationToken ct = default);

        Task<IReadOnlyList<Expense>> GetByGuidsAsync(
            string userId,
            IEnumerable<Guid> expenseIds,
            CancellationToken ct = default);

        Task<(IReadOnlyList<Expense> Items, int TotalCount)> GetPagedAsync(
            string userId,
            int page,
            int pageSize,
            DateTime? from = null,
            DateTime? to = null,
            string? category = null,
            CancellationToken ct = default);

        Task<bool> UpdateAsync(Expense expense, CancellationToken ct = default);
        Task<bool> DeleteAsync(string userId, Guid expenseId, CancellationToken ct = default);
        Task<bool> ExistsAsync(string userId, Guid expenseId, CancellationToken ct = default);
        Task<List<Expense>> RunSqlQueryAsync(string sql);

    }
}
