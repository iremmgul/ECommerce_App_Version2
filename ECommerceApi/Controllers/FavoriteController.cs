using ECommerceApi.Data;
using ECommerceApi.Dtos;
using ECommerceApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApi.Controllers
{
    [ApiController]
    [Route("favorite")]
    public class FavoritesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FavoritesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddFavorite([FromBody] FavoriteDto dto)
        {
            try
            {
                var exists = await _context.Favorites
                    .AnyAsync(f => f.UserId == dto.UserId && f.ProductId == dto.ProductId);

                if (exists)
                    return BadRequest(new { message = "Zaten favorilerde" });

                var favorite = new Favorite
                {
                    UserId = dto.UserId,
                    ProductId = dto.ProductId,
                    CreatedAt = DateTime.UtcNow
                };

                _context.Favorites.Add(favorite);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Favorilere eklendi" });
            }
            catch
            {
                return StatusCode(500, new { message = "Sunucu hatası" });
            }
        }

        [HttpDelete]
        public async Task<IActionResult> RemoveFavorite([FromBody] FavoriteDto dto)
        {
            try
            {
                var entity = await _context.Favorites
                    .FirstOrDefaultAsync(f => f.UserId == dto.UserId && f.ProductId == dto.ProductId);

                if (entity == null)
                    return NotFound();

                _context.Favorites.Remove(entity);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Favoriden çıkarıldı" });
            }
            catch
            {
                return StatusCode(500, new { message = "Sunucu hatası" });
            }
        }

        [HttpGet("check")]
        public async Task<IActionResult> CheckFavorite([FromQuery] int userId, [FromQuery] int productId)
        {
            try
            {
                var isFavorite = await _context.Favorites
                    .AnyAsync(f => f.UserId == userId && f.ProductId == productId);

                return Ok(new { isFavorite });
            }
            catch
            {
                return StatusCode(500, new { message = "Sunucu hatası" });
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetFavoritesByUser(int userId)
        {
            try
            {
                var favorites = await _context.Favorites
                    .Include(f => f.Product)
                    .Where(f => f.UserId == userId)
                    .ToListAsync();

                var formatted = favorites.Select(f => new
                {
                    id = f.Product.Id,
                    name = f.Product.Name,
                    price = f.Product.Price,
                    rate = f.Product.Rate,
                    stock = f.Product.Stock,
                    image = f.Product.Image
                });

                return Ok(formatted);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Favori ürünleri çekerken hata: " + ex.Message);
                return StatusCode(500, new { message = "Sunucu hatası" });
            }
        }
    }
}

