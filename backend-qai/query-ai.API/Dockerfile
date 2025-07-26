# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy entire source code (preserves folders & all files)
COPY . .

# Restore all projects using the solution file
RUN dotnet restore

# Build and publish the app in Release configuration
RUN dotnet publish -c Release -o /app/out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy published files from build stage
COPY --from=build /app/out .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "query-ai.API.dll"]
