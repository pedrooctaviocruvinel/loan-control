using LoanControl.Domain.Services;
using Microsoft.Extensions.DependencyInjection;

namespace LoanControl.CrossCutting.Dependencies;

internal static class ServicesConfiguration
{
    public static void AddServices(this IServiceCollection services) =>
        services.AddTransient<LoanService>();
}
