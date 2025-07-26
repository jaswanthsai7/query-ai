namespace query_ai.API.DTOs
{
    public record CreateExpenseRequest(
        Guid ExpenseId,
        string Category,
        decimal Amount,
        DateTime EntryDate,
        DateTime CreatedAt,
        string? PaymentMethod,
        string? Notes);

    public record UpdateExpenseRequest(
        string Category,
        decimal Amount,
        DateTime EntryDate,
        string? PaymentMethod,
        string? Notes);

    public record ExpenseResponse(
        int Id,
        Guid ExpenseId,
        string Category,
        decimal Amount,
        DateTime EntryDate,
        DateTime CreatedAt,
        string? PaymentMethod,
        string? Notes,
        string UserId);

    public record GetExpensesQuery(
        DateTime? From,
        DateTime? To,
        string? Category);

    public record GetExpensesPagedQuery(
        int Page,
        int PageSize,
        DateTime? From,
        DateTime? To,
        string? Category);

    public record Paginated<T>(IReadOnlyList<T> Items, int Total, int Page, int PageSize);

}
