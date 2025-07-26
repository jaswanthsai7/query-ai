FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY query-ai.API/query-ai.API.sln ./
COPY query-ai.API/query-ai.API.csproj ./query-ai.API/
COPY query-ai.Gemini/query-ai.Gemini.csproj ./query-ai.Gemini/

# Restore
RUN dotnet restore query-ai.API.sln

# Copy all source
COPY query-ai.API ./query-ai.API
COPY query-ai.Gemini ./query-ai.Gemini

# Build & publish
RUN dotnet publish query-ai.API/query-ai.API.csproj -c Release -o /app/publish /p:UseAppHost=false

# Final runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "query-ai.API.dll"]
