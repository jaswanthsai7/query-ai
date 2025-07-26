using Microsoft.EntityFrameworkCore;
using query_ai.API.Data;
using query_ai.API.Repositories;
using query_ai.API.Services;
using query_ai.API.Middlewares; // for ApiExceptionMiddleware

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173") // React Dev Server
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});
// Add Controllers
builder.Services.AddControllers()
                .AddJsonOptions(opt =>
                {
                    // Keep property names as defined (camelCase from JsonPropertyName)
                    opt.JsonSerializerOptions.PropertyNamingPolicy = null;
                });

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// PostgreSQL connection
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                      ?? Environment.GetEnvironmentVariable("DATABASE_URL");

builder.Services.AddDbContext<QueryAiDbContext>(options =>
    options.UseNpgsql(connectionString));

// Dependency Injection for Repositories and Services
builder.Services.AddScoped<IExpenseRepository, ExpenseRepository>();
builder.Services.AddScoped<IExpenseService, ExpenseService>();

var app = builder.Build();
app.UseCors("AllowFrontend");
// Enable Swagger in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Global Exception Handling Middleware
app.UseMiddleware<ApiExceptionMiddleware>();

// app.UseHttpsRedirection();  // Uncomment if using HTTPS
app.UseAuthorization();

// Map Controllers
app.MapControllers();

app.Run();
