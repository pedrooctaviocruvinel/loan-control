using Microsoft.OpenApi.Models;

namespace LoanControl.Presentation.Configurations;

internal static class SwaggerConfiguration
{
    public static void AddSwagger(this IServiceCollection services, IConfiguration configuration) =>
        services.AddSwaggerGen(sgo =>
        {
            sgo.SwaggerDoc("v1", BuildOpenApiInfo(configuration));
            sgo.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, "swagger.xml"));
        });

    public static void UseSwagger(this IApplicationBuilder app, IConfiguration configuration)
    {
        app.UseSwagger();
        app.UseSwaggerUI(a => a.SwaggerEndpoint("/swagger/v1/swagger.json", $"Loan Control - {configuration["Environment"]}"));
    }

    private static OpenApiInfo BuildOpenApiInfo(IConfiguration configuration) =>
        new()
        {
            Title = $"Loan Control - {configuration["Environment"]}",
            Version = "1.0.0",
            Description = "TODO",
            Contact = new OpenApiContact
            {
                Name = configuration["Contact:Name"],
                Email = configuration["Contact:Email"],
                Url = new Uri(configuration["Contact:GitHub"])
            },
            License = new OpenApiLicense()
            {
                Name = configuration["License:Name"],
                Url = new Uri(configuration["License:Url"])
            }
        };
}
