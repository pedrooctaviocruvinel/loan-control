FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src/LoanControl.Presentation/LoanControl.Presentation.csproj", "src/LoanControl.Presentation/"]
COPY ["src/LoanControl.Application/LoanControl.Application.csproj", "src/LoanControl.Application/"]
COPY ["src/LoanControl.CrossCutting.Core/LoanControl.CrossCutting.Core.csproj", "src/LoanControl.CrossCutting.Core/"]
COPY ["src/LoanControl.Domain/LoanControl.Domain.csproj", "src/LoanControl.Domain/"]
COPY ["src/LoanControl.CrossCutting/LoanControl.CrossCutting.csproj", "src/LoanControl.CrossCutting/"]
COPY ["src/LoanControl.Infrastructure/LoanControl.Infrastructure.csproj", "src/LoanControl.Infrastructure/"]
RUN dotnet restore "./src/LoanControl.Presentation/./LoanControl.Presentation.csproj"
COPY . .
WORKDIR "/src/src/LoanControl.Presentation"
RUN dotnet build "./LoanControl.Presentation.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./LoanControl.Presentation.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LoanControl.Presentation.dll"]
