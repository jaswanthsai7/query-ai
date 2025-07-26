# Use .NET SDK for build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ./query-ai.API/query-ai.API.sln ./query-ai.API/
COPY ./query-ai.API/query-ai.API.csproj ./query-ai.API/
COPY ./query-ai.Gemini/query-ai.Gemini.csproj ./query-ai.Gemini/

# Restore dependencies
RUN dotnet restore ./query-ai.API/query-ai.API.sln

# Copy all source files
COPY ./query-ai.API ./query-ai.API
COPY ./query-ai.Gemini ./query-ai.Gemini

# Build
RUN dotnet build ./query-ai.API/query-ai.API.sln -c Release -o /app/build

# Publish
RUN dotnet publish ./query-ai.API/query-ai.API.csproj -c Release -o /app/publish /p:UseAppHost=false

# Final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "query-ai.API.dll"]
