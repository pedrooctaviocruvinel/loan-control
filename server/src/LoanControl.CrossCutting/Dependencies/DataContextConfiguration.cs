using LoanControl.Domain.Repositories;
using LoanControl.Infrastructure;
using LoanControl.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace LoanControl.CrossCutting.Dependencies;

internal static class DataContextConfiguration
{
    public static void AddDataContext(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDataContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString("PostgreSQL"),
                actions => actions.MigrationsAssembly("LoanControl.Infrastructure")));

        services.AddTransient<ILoanRepository, LoanRepository>();
        services.AddTransient<IPaymentRepository, PaymentRepository>();
    }
}
