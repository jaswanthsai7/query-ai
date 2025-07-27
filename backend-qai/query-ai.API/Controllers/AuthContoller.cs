using Microsoft.AspNetCore.Mvc;
using query_ai.API.DTOs;
using query_ai.API.Services;

namespace query_ai.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] UserSignUpDto dto)
        {
            var (token, user) = await _authService.SignUpAsync(dto.Name, dto.Email, dto.Password);
            return Ok(new { token, user });
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] UserSignInDto dto)
        {
            var (token, user) = await _authService.SignInAsync(dto.Email, dto.Password);
            return Ok(new { token, user });
        }
    }
}
