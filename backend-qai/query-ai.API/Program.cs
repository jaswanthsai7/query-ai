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

// Gemini settings from appsettings.json
builder.Services.Configure<GeminiSettings>(builder.Configuration.GetSection("Gemini"));

// Register GeminiClient
builder.Services.AddHttpClient<IGeminiClient, GeminiClient>();

// DB Connection
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                      ?? Environment.GetEnvironmentVariable("DATABASE_URL");

builder.Services.AddDbContext<QueryAiDbContext>(options =>
    options.UseNpgsql(connectionString));

// Repositories and Services
builder.Services.AddScoped<IExpenseRepository, ExpenseRepository>();
builder.Services.AddScoped<IExpenseService, ExpenseService>();
builder.Services.AddScoped<IChatService, ChatService>(); // <--- Register ChatService

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

app.MapControllers();

app.MapGet("/", () => "QueryAI API is running");

app.Run();
