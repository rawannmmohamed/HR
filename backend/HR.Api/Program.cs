using HR.Api.Auth;
using HR.Api.Configuration;
using HR.Api.Features.Auth;
using HR.Api.Features.Dashboard;
using HR.Application;
using HR.Infrastructure;
using HR.Infrastructure.Persistence.Seed;

var builder = WebApplication.CreateBuilder(args);

const string frontendCorsPolicy = "FrontendCorsPolicy";

builder.Services
    .AddApplication()
    .AddInfrastructure(builder.Configuration);
builder.Services.Configure<AuthCookieSettings>(builder.Configuration.GetSection(AuthCookieSettings.SectionName));
builder.Services.AddHrAuthentication(builder.Configuration, builder.Environment);
builder.Services.AddCors(options =>
{
    options.AddPolicy(frontendCorsPolicy, policy =>
    {
        var corsOptions = builder.Configuration
            .GetSection(CorsOptions.SectionName)
            .Get<CorsOptions>() ?? new CorsOptions();

        if (corsOptions.AllowedOrigins.Length == 0)
        {
            throw new InvalidOperationException("At least one CORS allowed origin must be configured.");
        }

        policy
            .WithOrigins(corsOptions.AllowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

app.UseCors(frontendCorsPolicy);
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/health", () => Results.Ok(new { status = "Healthy", service = "HR.Api" }))
    .WithName("HealthCheck");
app.MapAuthEndpoints();
app.MapDashboardEndpoints();

await AuthSeedData.ApplyAsync(app.Services);

app.Run();
