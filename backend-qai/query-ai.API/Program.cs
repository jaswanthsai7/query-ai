using Microsoft.EntityFrameworkCore;
using query_ai.API.Data;
using query_ai.API.Repositories;
using query_ai.API.Services;
using query_ai.API.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

// Controllers
builder.Services.AddControllers()
    .AddJsonOptions(opt =>
    {
        opt.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DB Connection
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                      ?? Environment.GetEnvironmentVariable("DATABASE_URL");

builder.Services.AddDbContext<QueryAiDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<IExpenseRepository, ExpenseRepository>();
builder.Services.AddScoped<IExpenseService, ExpenseService>();

var app = builder.Build();
app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ApiExceptionMiddleware>();

// app.UseHttpsRedirection();
app.UseAuthorization();

// API Controllers
app.MapControllers();

// Root Endpoint
app.MapGet("/", () => "QueryAI API is running ??");

app.Run();
