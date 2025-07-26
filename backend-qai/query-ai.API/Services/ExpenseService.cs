using query_ai.API.DTOs;
using query_ai.API.Models;
using query_ai.API.Repositories;

namespace query_ai.API.Services
{

    public sealed class ExpenseService : IExpenseService
    {
        private readonly IExpenseRepository _repo;

        public ExpenseService(IExpenseRepository repo) => _repo = repo;

        public async Task<ExpenseResponse> CreateAsync(string userId, CreateExpenseRequest request, CancellationToken ct = default)
        {
            // Make sure the GUID isn't duplicated for the same user
            if (await _repo.ExistsAsync(userId, request.ExpenseId, ct))
                throw new InvalidOperationException("Expense with the same Guid already exists for this user.");

            var entity = new Expense
            {
                ExpenseId = request.ExpenseId,
                Category = request.Category,
                Amount = request.Amount,
                EntryDate = request.EntryDate,
                CreatedAt = request.CreatedAt,
                PaymentMethod = request.PaymentMethod ?? string.Empty,
                Notes = request.Notes ?? string.Empty,
                UserId = userId
            };

            var created = await _repo.AddAsync(entity, ct);
            return ToResponse(created);
        }

        public async Task<ExpenseResponse?> GetAsync(string userId, Guid expenseId, CancellationToken ct = default)
        {
            var e = await _repo.GetByGuidAsync(userId, expenseId, ct);
            return e is null ? null : ToResponse(e);
        }

        public async Task<IReadOnlyList<ExpenseResponse>> GetByUserAsync(string userId, GetExpensesQuery query, CancellationToken ct = default)
        {
            var list = await _repo.GetByUserAsync(userId, query.From, query.To, query.Category, ct);
            return list.Select(ToResponse).ToList();
        }

        public async Task<Paginated<ExpenseResponse>> GetPagedAsync(string userId, GetExpensesPagedQuery query, CancellationToken ct = default)
        {
            var (items, total) = await _repo.GetPagedAsync(userId, query.Page, query.PageSize, query.From, query.To, query.Category, ct);
            return new Paginated<ExpenseResponse>(items.Select(ToResponse).ToList(), total, query.Page, query.PageSize);
        }

        public async Task<IReadOnlyList<ExpenseResponse>> GetByIdsAsync(string userId, IEnumerable<Guid> expenseIds, CancellationToken ct = default)
        {
            var list = await _repo.GetByGuidsAsync(userId, expenseIds, ct);
            return list.Select(ToResponse).ToList();
        }

        public async Task<bool> UpdateAsync(string userId, Guid expenseId, UpdateExpenseRequest request, CancellationToken ct = default)
        {
            var existing = await _repo.GetByGuidAsync(userId, expenseId, ct);
            if (existing is null) return false;

            existing.Category = request.Category;
            existing.Amount = request.Amount;
            existing.EntryDate = request.EntryDate;
            existing.PaymentMethod = request.PaymentMethod ?? string.Empty;
            existing.Notes = request.Notes ?? string.Empty;

            return await _repo.UpdateAsync(existing, ct);
        }

        public Task<bool> DeleteAsync(string userId, Guid expenseId, CancellationToken ct = default)
            => _repo.DeleteAsync(userId, expenseId, ct);

        private static ExpenseResponse ToResponse(Expense e) =>
            new(
                e.Id,
                e.ExpenseId,
                e.Category,
                e.Amount,
                e.EntryDate,
                e.CreatedAt,
                string.IsNullOrWhiteSpace(e.PaymentMethod) ? null : e.PaymentMethod,
                string.IsNullOrWhiteSpace(e.Notes) ? null : e.Notes,
                e.UserId
            );
    }
}
