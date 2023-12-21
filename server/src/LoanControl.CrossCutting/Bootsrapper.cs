using LoanControl.CrossCutting.Dependencies;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LoanControl.CrossCutting;

public static class Bootsrapper
{
    public static void AddDependencies(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDataContext(configuration);
        services.AddMediator();
        services.AddServices();
    }
}
