using Microsoft.AspNetCore.Mvc;
using query_ai.API.Models;
using query_ai.API.Services;
using System.Threading;
using System.Threading.Tasks;

namespace query_ai.API.Controllers
{
    [ApiController]
    [Route("api/aichat")]
    public class AIChatController : ControllerBase
    {
        private readonly IChatService _chatService;

        public AIChatController(IChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpPost("get-data")]
        public async Task<IActionResult> Post([FromBody] ChatRequest request, CancellationToken ct)
        {
            if (string.IsNullOrWhiteSpace(request.Message))
                return BadRequest("Message cannot be empty.");


            try
            {
                var (chatMessage, data) = await _chatService.HandleUserMessageAsync(request.Message, request.userId, ct);

                var response = new ChatResponse
                {
                    ChatMessage = chatMessage,
                    Data = data
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                // Log exception here if logging is set up
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }

    public class ChatRequest
    {
        public string Message { get; set; } = string.Empty;
        public string userId { get; set; } = string.Empty;
    }

    public class ChatResponse
    {
        public string ChatMessage { get; set; } = string.Empty;
        public List<Expense> Data { get; set; } = new();
    }
}
