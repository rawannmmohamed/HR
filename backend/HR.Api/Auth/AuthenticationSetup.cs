using System.Text;
using HR.Application.Auth;
using HR.Infrastructure.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace HR.Api.Auth;

public static class AuthenticationSetup
{
    private const string DevelopmentSigningKey = "local-development-signing-key-change-before-production";

    public static IServiceCollection AddHrAuthentication(
        this IServiceCollection services,
        IConfiguration configuration,
        IWebHostEnvironment environment)
    {
        var jwtOptions = configuration
            .GetSection(JwtOptions.SectionName)
            .Get<JwtOptions>()
            ?? throw new InvalidOperationException("JWT configuration was not found.");

        if (jwtOptions.SigningKey.Length < 32)
        {
            throw new InvalidOperationException("JWT signing key must be at least 32 characters.");
        }

        if (!environment.IsDevelopment() && jwtOptions.SigningKey == DevelopmentSigningKey)
        {
            throw new InvalidOperationException("JWT signing key must be configured from a secure production secret.");
        }

        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = jwtOptions.Issuer,
                    ValidateAudience = true,
                    ValidAudience = jwtOptions.Audience,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.SigningKey)),
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromMinutes(1)
                };
            });

        services.AddAuthorizationBuilder()
            .AddPolicy(AuthPolicies.HrAdmin, policy => policy.RequireRole(AuthRoleNames.HrAdmin))
            .AddPolicy(AuthPolicies.Employee, policy => policy.RequireRole(AuthRoleNames.Employee));

        return services;
    }
}
