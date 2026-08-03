using HR.Api.Features.Dashboard;
using HR.Application;
using HR.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

const string frontendCorsPolicy = "FrontendCorsPolicy";

builder.Services
    .AddApplication()
    .AddInfrastructure(builder.Configuration);
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

app.MapGet("/health", () => Results.Ok(new { status = "Healthy", service = "HR.Api" }))
    .WithName("HealthCheck");
app.MapDashboardEndpoints();

app.Run();
