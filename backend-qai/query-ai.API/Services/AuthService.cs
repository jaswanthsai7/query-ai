using Microsoft.IdentityModel.Tokens;
using query_ai.API.Helpers;
using query_ai.API.Models;
using query_ai.API.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace query_ai.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepo;
        private readonly IConfiguration _config;

        public AuthService(IUserRepository userRepo, IConfiguration config)
        {
            _userRepo = userRepo;
            _config = config;
        }

        public async Task<(string Token, User User)> SignUpAsync(string name, string email, string password)
        {
            if (await _userRepo.EmailExistsAsync(email))
                throw new Exception("Email already registered");

            var user = new User
            {
                Name = name,
                Email = email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                QueryId = await GenerateUniqueQueryId()
            };

            await _userRepo.AddAsync(user);
            await _userRepo.SaveChangesAsync();

            return (GenerateJwtToken(user), user);
        }

        public async Task<(string Token, User User)> SignInAsync(string email, string password)
        {
            var user = await _userRepo.GetByEmailAsync(email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                throw new Exception("Invalid credentials");

            return (GenerateJwtToken(user), user);
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim("queryId", user.QueryId),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private async Task<string> GenerateUniqueQueryId()
        {
            string queryId;
            do
            {
                queryId = QueryIDGenerator.GenerateQueryId();
            } while (await _userRepo.GetByQueryIdAsync(queryId) != null);

            return queryId;
        }
    }
}
