namespace DivingApplication.Api.Models.Dto
{
    public class LoginRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }

    public class RegisterRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Name { get; set; }
    }

    public class AuthResponse
    {
        public required string Token { get; set; }
        public required UserDto User { get; set; }
    }

    public class UserDto
    {
        public required string Id { get; set; }
        public required string Email { get; set; }
        public string? Name { get; set; }
    }
}
