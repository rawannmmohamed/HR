using HR.Application;
using HR.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddApplication()
    .AddInfrastructure(builder.Configuration);

var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new { status = "Healthy", service = "HR.Api" }))
    .WithName("HealthCheck");

app.Run();
