namespace DivingApplication.Api.Models.Dto
{
    public class ProfileResponse
    {
        public required string Id { get; set; }
        public required string Email { get; set; }
        public string? Name { get; set; }
        public required string Username { get; set; }
        public required string Level { get; set; }
        public int TotalDives { get; set; }
        public int Countries { get; set; }
        public required string Since { get; set; }
    }
}
