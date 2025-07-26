using Microsoft.EntityFrameworkCore;
using query_ai.API.Data;
using query_ai.API.Models;

namespace query_ai.API.Repositories
{

    public sealed class ExpenseRepository : IExpenseRepository
    {
        private readonly QueryAiDbContext _context;

        public ExpenseRepository(QueryAiDbContext context) => _context = context;

        public async Task<Expense> AddAsync(Expense expense, CancellationToken ct = default)
        {
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync(ct);
            return expense;
        }

        public Task<bool> ExistsAsync(string userId, Guid expenseId, CancellationToken ct = default)
            => _context.Expenses.AnyAsync(e => e.UserId == userId && e.ExpenseId == expenseId, ct);

        public Task<Expense?> GetByGuidAsync(string userId, Guid expenseId, CancellationToken ct = default)
            => _context.Expenses
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.UserId == userId && e.ExpenseId == expenseId, ct);

        public async Task<IReadOnlyList<Expense>> GetByUserAsync(
            string userId, DateTime? from = null, DateTime? to = null, string? category = null, CancellationToken ct = default)
        {
            var query = _context.Expenses.AsNoTracking().Where(e => e.UserId == userId);

            if (from.HasValue) query = query.Where(e => e.EntryDate >= from.Value);
            if (to.HasValue) query = query.Where(e => e.EntryDate <= to.Value);
            if (!string.IsNullOrWhiteSpace(category)) query = query.Where(e => e.Category == category);

            return await query
                .OrderByDescending(e => e.EntryDate)
                .ToListAsync(ct);
        }

        public async Task<IReadOnlyList<Expense>> GetByGuidsAsync(
            string userId, IEnumerable<Guid> expenseIds, CancellationToken ct = default)
        {
            var ids = expenseIds.ToList();
            if (ids.Count == 0) return Array.Empty<Expense>();

            return await _context.Expenses
                .AsNoTracking()
                .Where(e => e.UserId == userId && ids.Contains(e.ExpenseId))
                .ToListAsync(ct);
        }

        public async Task<(IReadOnlyList<Expense> Items, int TotalCount)> GetPagedAsync(
            string userId, int page, int pageSize, DateTime? from, DateTime? to, string? category, CancellationToken ct = default)
        {
            var query = _context.Expenses.AsNoTracking().Where(e => e.UserId == userId);

            if (from.HasValue) query = query.Where(e => e.EntryDate >= from.Value);
            if (to.HasValue) query = query.Where(e => e.EntryDate <= to.Value);
            if (!string.IsNullOrWhiteSpace(category)) query = query.Where(e => e.Category == category);

            var total = await query.CountAsync(ct);

            var items = await query
                .OrderByDescending(e => e.EntryDate)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(ct);

            return (items, total);
        }

        public async Task<bool> UpdateAsync(Expense expense, CancellationToken ct = default)
        {
            _context.Expenses.Update(expense);
            var changed = await _context.SaveChangesAsync(ct);
            return changed > 0;
        }

        public async Task<bool> DeleteAsync(string userId, Guid expenseId, CancellationToken ct = default)
        {
            // Fast EF Core 7+ bulk delete
            var rows = await _context.Expenses
                .Where(e => e.UserId == userId && e.ExpenseId == expenseId)
                .ExecuteDeleteAsync(ct);

            return rows > 0;
        }
    }
}