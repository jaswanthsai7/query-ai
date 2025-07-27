using Microsoft.EntityFrameworkCore;
using query_ai.API.Data;
using query_ai.API.Models;

namespace query_ai.API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly QueryAiDbContext _context;

        public UserRepository(QueryAiDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> GetByQueryIdAsync(string queryId)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.QueryId == queryId);
        }

        public async Task AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
