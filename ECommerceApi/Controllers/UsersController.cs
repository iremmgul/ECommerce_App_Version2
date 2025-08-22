using ECommerceApi.Data;
using ECommerceApi.Dtos;
using ECommerceApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceApi.Controllers
{
    [ApiController]
    [Route("users")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasher _passwordHasher;
        private readonly ILogger<UsersController> _logger;

        public UsersController(AppDbContext context, IPasswordHasher passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        // GET: /users/users/{username}
        [HttpGet("users/{username}")]
        [Authorize]
        public IActionResult GetUserByUsername(string username)
        {
            if (string.IsNullOrWhiteSpace(username)) return BadRequest();
            var user = _context.Users.FirstOrDefault(u => u.Username == username.Trim());
            if (user is null) return NotFound();
            return Ok(new { user.Username, user.Email });
        }

        // PUT: /users/users/{username}/password
        [HttpPut("users/{username}/password")]
        [Authorize]
        public IActionResult ChangePassword(string username, [FromBody] ChangePasswordDto dto)
        {
            if (dto is null || string.IsNullOrWhiteSpace(dto.NewPassword))
                return BadRequest(new { message = "Yeni şifre gerekli." });

            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            if (user is null) return NotFound();

            user.PasswordHash = _passwordHasher.HashPassword(dto.NewPassword);
            user.UpdatedAt = DateTime.UtcNow;
            _context.SaveChanges();

            return Ok(new { message = "Şifre güncellendi." });
        }
    }
}