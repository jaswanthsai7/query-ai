using Microsoft.EntityFrameworkCore;
using query_ai.API.Models;

namespace query_ai.API.Data
{
    public class QueryAiDbContext : DbContext
    {
        public QueryAiDbContext(DbContextOptions<QueryAiDbContext> options)
            : base(options)
        {
        }

        public DbSet<Question> Questions { get; set; }
    }
}
