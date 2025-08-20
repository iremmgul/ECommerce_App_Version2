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


/*
using ECommerceApi.Data;
using ECommerceApi.Dtos;
using ECommerceApi.Services; // << kendi IPasswordHasher’ını kullan
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

        public UsersController(AppDbContext context, IPasswordHasher passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        // GET: /users/{username}
        [HttpGet("{username}")]
        [Authorize]
        public IActionResult GetUserByUsername(string username)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            if (user is null) return NotFound();

            var userDto = new UserDto
            {
                Username = user.Username,
                Email = user.Email
            };

            return Ok(userDto);
        }

        // PUT: /users/{username}/password
        [HttpPut("{username}/password")]
        [Authorize]
        public IActionResult ChangePassword(string username, [FromBody] ChangePasswordDto changePasswordDto)
        {
            if (changePasswordDto is null || string.IsNullOrWhiteSpace(changePasswordDto.NewPassword))
                return BadRequest(new { message = "Yeni şifre gerekli." });

            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            if (user is null) return NotFound();

            user.PasswordHash = _passwordHasher.HashPassword(changePasswordDto.NewPassword);
            user.UpdatedAt = DateTime.UtcNow;

            _context.SaveChanges();

            return Ok(new { message = "Şifre güncellendi." });
        }
    }
}

-----------------------------------------------------------------------------------------------


using ECommerceApi.Data;
using ECommerceApi.Dtos;
using ECommerceApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceApi.Controllers
{
    [ApiController]
    [Route("users")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;

        public UsersController(AppDbContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        // GET: users/users/{username}
        [HttpGet("users/{username}")]
        [Authorize]
        public IActionResult GetUserByUsername(string username)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            if (user == null) return NotFound();

            var userDto = new UserDto
            {
                Username = user.Username,
                Email = user.Email
            };

            return Ok(userDto);
        }

        // PUT: users/{username}/password
        [HttpPut("{username}/password")]
        [Authorize]
        public IActionResult ChangePassword(string username, [FromBody] ChangePasswordDto changePasswordDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            if (user == null) return NotFound();

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(changePasswordDto.NewPassword);

            _context.SaveChanges();

            return Ok(new { message = "Şifre güncellendi." });
        }
    }

}
*/