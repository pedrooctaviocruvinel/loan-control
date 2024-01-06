using LoanControl.Application.Mappers;
using Microsoft.Extensions.DependencyInjection;

namespace LoanControl.CrossCutting.Dependencies;

internal static class AutoMapperConfiguration
{
    public static void AddAutoMapper(this IServiceCollection services) =>
        services.AddAutoMapper(typeof(BackupMapper), typeof(LoanMapper));
}
