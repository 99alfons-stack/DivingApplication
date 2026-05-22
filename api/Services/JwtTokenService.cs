using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DivingApplication.Api.Models;
using Microsoft.IdentityModel.Tokens;

namespace DivingApplication.Api.Services
{
    public interface ITokenService
    {
        string GenerateJwtToken(AppUser user);
    }

    public class JwtTokenService : ITokenService
    {
        private readonly IConfiguration _configuration;

        public JwtTokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateJwtToken(AppUser user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secret = jwtSettings["Secret"] ?? throw new Exception("JWT Secret not configured");
            var issuer = jwtSettings["Issuer"] ?? "DivingApp";
            var audience = jwtSettings["Audience"] ?? "DivingAppUsers";

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email ?? ""),
                new Claim("FullName", user.FullName ?? "")
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(24),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
