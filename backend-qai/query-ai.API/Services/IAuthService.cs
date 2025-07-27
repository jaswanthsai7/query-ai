using query_ai.API.Models;

namespace query_ai.API.Services
{
    public interface IAuthService
    {
        Task<(string Token, User User)> SignUpAsync(string name, string email, string password);
        Task<(string Token, User User)> SignInAsync(string email, string password);
    }
}
