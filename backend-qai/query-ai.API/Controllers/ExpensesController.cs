using Microsoft.AspNetCore.Mvc;
using query_ai.API.DTOs;
using query_ai.API.Services;

namespace query_ai.API.Controllers
{
    [ApiController]
    [Route("api/expense")]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseService _service;

        public ExpensesController(IExpenseService service) => _service = service;

        private string GetUserId() =>
            HttpContext.User?.Identity?.Name ??
            Request.Headers["x-user-id"].FirstOrDefault() ??
            throw new UnauthorizedAccessException("UserId missing");

        /// <summary>
        /// Add a new expense.
        /// </summary>
        [HttpPost("add-expense")]
        public async Task<ActionResult<ExpenseResponse>> AddExpense([FromBody] CreateExpenseRequest request, CancellationToken ct)
        {
            var userId = GetUserId();
            var result = await _service.CreateAsync(userId, request, ct);
            return CreatedAtAction(nameof(GetExpenseById), new { expenseId = result.ExpenseId }, result);
        }

        /// <summary>
        /// Get a single expense by its GUID.
        /// </summary>
        [HttpGet("get-expense/{expenseId:guid}")]
        public async Task<ActionResult<ExpenseResponse>> GetExpenseById([FromRoute] Guid expenseId, CancellationToken ct)
        {
            var userId = GetUserId();
            var result = await _service.GetAsync(userId, expenseId, ct);
            return result is null ? NotFound() : Ok(result);
        }

        /// <summary>
        /// Get all expenses for the current user with optional filters.
        /// </summary>
        [HttpGet("get-all-expenses")]
        public async Task<ActionResult<IReadOnlyList<ExpenseResponse>>> GetAllExpenses(
            [FromQuery] DateTime? from,
            [FromQuery] DateTime? to,
            [FromQuery] string? category,
            CancellationToken ct)
        {
            var userId = GetUserId();
            var items = await _service.GetByUserAsync(userId, new GetExpensesQuery(from, to, category), ct);
            return Ok(items);
        }

        /// <summary>
        /// Get paginated expenses for the current user.
        /// </summary>
        [HttpGet("get-paged-expenses")]
        public async Task<ActionResult<Paginated<ExpenseResponse>>> GetPagedExpenses(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20,
            [FromQuery] DateTime? from = null,
            [FromQuery] DateTime? to = null,
            [FromQuery] string? category = null,
            CancellationToken ct = default)
        {
            var userId = GetUserId();
            var result = await _service.GetPagedAsync(userId, new GetExpensesPagedQuery(page, pageSize, from, to, category), ct);
            return Ok(result);
        }

        /// <summary>
        /// Get multiple expenses by a list of GUIDs.
        /// </summary>
        [HttpPost("get-expenses-by-ids")]
        public async Task<ActionResult<IReadOnlyList<ExpenseResponse>>> GetExpensesByIds(
            [FromBody] IEnumerable<Guid> expenseIds,
            CancellationToken ct)
        {
            var userId = GetUserId();
            var result = await _service.GetByIdsAsync(userId, expenseIds, ct);
            return Ok(result);
        }

        /// <summary>
        /// Update an existing expense.
        /// </summary>
        [HttpPut("update-expense/{expenseId:guid}")]
        public async Task<IActionResult> UpdateExpense([FromRoute] Guid expenseId, [FromBody] UpdateExpenseRequest request, CancellationToken ct)
        {
            var userId = GetUserId();
            var ok = await _service.UpdateAsync(userId, expenseId, request, ct);
            return ok ? NoContent() : NotFound();
        }

        /// <summary>
        /// Delete an expense by GUID.
        /// </summary>
        [HttpDelete("delete-expense/{expenseId:guid}")]
        public async Task<IActionResult> DeleteExpense([FromRoute] Guid expenseId, CancellationToken ct)
        {
            var userId = GetUserId();
            var ok = await _service.DeleteAsync(userId, expenseId, ct);
            return ok ? NoContent() : NotFound();
        }
    }
}
