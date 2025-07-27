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
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Expense entity configuration
            modelBuilder.Entity<Expense>(e =>
            {
                e.ToTable("expenses");

                // Precision for Amount (currency-like values)
                e.Property(p => p.Amount).HasPrecision(18, 2);

                // Default UTC creation timestamp
                e.Property(p => p.CreatedAt).HasDefaultValueSql("now() at time zone 'utc'");

                // Unique index for (UserId, ExpenseId)
                e.HasIndex(p => new { p.UserId, p.ExpenseId }).IsUnique();

                // Index for filtering per user & date range
                e.HasIndex(p => new { p.UserId, p.EntryDate });
            });

            modelBuilder.Entity<User>(u =>
            {
                u.ToTable("users");
                u.HasIndex(x => x.Email).IsUnique(); // Unique email
                u.HasIndex(x => x.QueryId).IsUnique(); // Ensure QueryId is unique
            });

        }
    }
}
