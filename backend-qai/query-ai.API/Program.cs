using Microsoft.EntityFrameworkCore;
using query_ai.API.Data;
using query_ai.API.Middlewares;
using query_ai.API.Repositories;
using query_ai.API.Services;
using query_ai.Gemini.Integration;

var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "https://query-ai-812b.onrender.com", "https://vercel.com")
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

// Gemini settings
builder.Services.Configure<GeminiSettings>(builder.Configuration.GetSection("Gemini"));

// Gemini Client
builder.Services.AddHttpClient<IGeminiClient, GeminiClient>();

// Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                      ?? Environment.GetEnvironmentVariable("DATABASE_URL");

builder.Services.AddDbContext<QueryAiDbContext>(options =>
    options.UseNpgsql(connectionString));

// Repositories & Services
builder.Services.AddScoped<IExpenseRepository, ExpenseRepository>();
builder.Services.AddScoped<IExpenseService, ExpenseService>();
builder.Services.AddScoped<IChatService, ChatService>();

var app = builder.Build();
app.UseCors("AllowFrontend");

// Always enable Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "QueryAI API V1");
    c.RoutePrefix = string.Empty; // Swagger UI opens at "/"
});

app.UseMiddleware<ApiExceptionMiddleware>();

app.UseAuthorization();

app.MapControllers();

// Optional: Root message if Swagger UI is disabled
// app.MapGet("/", () => "QueryAI API is running");

app.Run();
