using Microsoft.Extensions.DependencyInjection;

namespace LoanControl.CrossCutting.Dependencies;

internal static class MediatorConfiguration
{
    public static void AddMediator(this IServiceCollection services) =>
        services.AddMediatR(msc =>
            msc.RegisterServicesFromAssembly(AppDomain.CurrentDomain.Load("LoanControl.Application")));
}
