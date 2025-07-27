using query_ai.API.Models;

namespace query_ai.API.Repositories
{
   
        public interface IUserRepository
        {
            Task<User> GetByEmailAsync(string email);
            Task<User> GetByQueryIdAsync(string queryId);
            Task AddAsync(User user);
            Task<bool> EmailExistsAsync(string email);
            Task SaveChangesAsync();
        }
    

}
