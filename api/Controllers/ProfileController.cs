using DivingApplication.Api.Models;
using DivingApplication.Api.Models.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DivingApplication.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;

        public ProfileController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<ProfileResponse>> Me()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized(new { message = "Ingen inloggad användare hittades" });
            }

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound(new { message = "Användaren finns inte längre" });
            }

            var displayName = user.FullName ?? user.Email ?? "Användare";
            var username = $"@{(user.Email ?? displayName).Split('@')[0]}";

            return Ok(new ProfileResponse
            {
                Id = user.Id,
                Email = user.Email ?? string.Empty,
                Name = user.FullName,
                Username = username,
                Level = "Ny dykare",
                TotalDives = 0,
                Countries = 0,
                Since = user.CreatedAt.Year.ToString()
            });
        }
    }
}
