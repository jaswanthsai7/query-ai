FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy solution and project files with relative paths
COPY query-ai.API/*.sln ./query-ai.API/
COPY query-ai.API/*.csproj ./query-ai.API/
COPY query-ai.Gemini/*.csproj ./query-ai.Gemini/

# Restore using the solution file inside query-ai.API folder
WORKDIR /app/query-ai.API
RUN dotnet restore query-ai.API.sln

# Copy all source code
COPY . .

# Build and publish
RUN dotnet publish query-ai.API.sln -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/out .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "query-ai.API.dll"]
