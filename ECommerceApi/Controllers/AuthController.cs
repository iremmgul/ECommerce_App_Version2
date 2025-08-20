using ECommerceApi.Data;
using ECommerceApi.Dtos;
using ECommerceApi.Models;
using ECommerceApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceApi.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;
        private readonly IPasswordHasher _passwordHasher;

        public AuthController(AppDbContext context, TokenService tokenService, IPasswordHasher passwordHasher)
        {
            _context = context;
            _tokenService = tokenService;
            _passwordHasher = passwordHasher;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] RegisterUserDto registerDto)
        {
            if (!ModelState.IsValid) return ValidationProblem(ModelState);

            var username = registerDto.Username.Trim();
            var email = registerDto.Email.Trim();

            if (_context.Users.Any(u => u.Username == username))
                return Conflict(new { message = "Bu kullanıcı adı zaten alınmış." });

            if (_context.Users.Any(u => u.Email == email))
                return Conflict(new { message = "Bu e-posta adresi zaten kayıtlı." });

            var hashedPassword = _passwordHasher.HashPassword(registerDto.Password);

            var user = new User
            {
                Username = username,
                Email = email,
                PasswordHash = hashedPassword,
                Role = "user",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok(new { message = "Kayıt başarılı", user = new { user.Id, user.Username, user.Email } });
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginUserDto loginDto)
        {
            if (!ModelState.IsValid) return ValidationProblem(ModelState);

            var user = _context.Users.SingleOrDefault(u => u.Username == loginDto.Username);
            if (user is null) return Unauthorized(new { message = "Kullanıcı adı geçersiz." });

            var ok = _passwordHasher.VerifyPassword(user.PasswordHash, loginDto.Password);
            if (!ok) return Unauthorized(new { message = "Şifre hatalı." });

            var token = _tokenService.CreateToken(user);

            return Ok(new
            {
                token,
                user = new { id = user.Id, username = user.Username, email = user.Email, role = user.Role }
            });
        }
    }
}


/*
using ECommerceApi.Data;
using ECommerceApi.Dtos;
using ECommerceApi.Models;
using ECommerceApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ECommerceApi.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;
        private readonly IPasswordHasher _passwordHasher;

        public AuthController(AppDbContext context, TokenService tokenService, IPasswordHasher passwordHasher)
        {
            _context = context;
            _tokenService = tokenService;
            _passwordHasher = passwordHasher;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterUserDto registerDto)
        {
            Console.WriteLine($"Gelen email: {registerDto.Username}");

            if (_context.Users.Any(u => u.Username == registerDto.Username))
            {
                return BadRequest("Bu kullanıcı adı zaten alınmış.");
            }

            if (_context.Users.Any(u => u.Email == registerDto.Email))
            {
                return BadRequest("Bu e-posta adresi zaten kayıtlı.");
            }

            // Şifreyi servisle hashle
            string hashedPassword = _passwordHasher.HashPassword(registerDto.Password);

            var user = new User
            {
                Username = registerDto.Username,
                PasswordHash = hashedPassword,
                Email = registerDto.Email,
                Role = "user",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Kayıt başarılı");
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginUserDto loginDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = _context.Users.SingleOrDefault(u => u.Username == loginDto.Username);
            if (user == null) return Unauthorized("Kullanıcı adı geçersiz.");

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                return Unauthorized("Şifre hatalı.");

            var token = _tokenService.CreateToken(user);

            return Ok(new
            {
                token,
                user = new
                {
                    id = user.Id,
                    username = user.Username,
                    email = user.Email,
                    role = user.Role
                }
            });
        }
    }
}
*/
