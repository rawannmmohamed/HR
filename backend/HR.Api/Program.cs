using HR.Api.Auth;
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
builder.Services.AddHrAuthentication(builder.Configuration);
builder.Services.AddCors(options =>
{
    options.AddPolicy(frontendCorsPolicy, policy =>
    {
        policy
            .WithOrigins("http://localhost:5173", "http://localhost:5174", "http://localhost:5175")
            .AllowAnyHeader()
            .AllowAnyMethod();
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
