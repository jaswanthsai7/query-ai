using query_ai.API.DTOs;

namespace query_ai.API.Services
{

    public interface IExpenseService
    {
        Task<ExpenseResponse> CreateAsync(string userId, CreateExpenseRequest request, CancellationToken ct = default);
        Task<ExpenseResponse?> GetAsync(string userId, Guid expenseId, CancellationToken ct = default);
        Task<IReadOnlyList<ExpenseResponse>> GetByUserAsync(string userId, GetExpensesQuery query, CancellationToken ct = default);
        Task<Paginated<ExpenseResponse>> GetPagedAsync(string userId, GetExpensesPagedQuery query, CancellationToken ct = default);
        Task<IReadOnlyList<ExpenseResponse>> GetByIdsAsync(string userId, IEnumerable<Guid> expenseIds, CancellationToken ct = default);
        Task<bool> UpdateAsync(string userId, Guid expenseId, UpdateExpenseRequest request, CancellationToken ct = default);
        Task<bool> DeleteAsync(string userId, Guid expenseId, CancellationToken ct = default);
    }

}
