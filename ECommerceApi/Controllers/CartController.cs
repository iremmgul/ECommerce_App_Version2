using ECommerceApi.Data;
using ECommerceApi.Dtos;
using ECommerceApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerceApi.Controllers
{
    [ApiController]
    [Route("cart")]
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CartController(AppDbContext context)
        {
            _context = context;
        }

        // POST: cart
        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] CartDto request)
        {
            var cartItem = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == request.UserId && c.ProductId == request.ProductId);

            if (cartItem != null)
            {
                cartItem.Quantity += request.Quantity;
                await _context.SaveChangesAsync();
            }
            else
            {
                var newItem = new Cart
                {
                    UserId = request.UserId,
                    ProductId = request.ProductId,
                    Quantity = request.Quantity,
                    CreatedAt = DateTime.UtcNow
                };
                _context.Carts.Add(newItem);
                await _context.SaveChangesAsync();
            }

            return Ok(new { message = "Ürün sepete eklendi" });
        }

        // DELETE: cart
        [HttpDelete]
        public async Task<IActionResult> RemoveFromCart([FromBody] CartDto request)
        {
            var cartItem = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == request.UserId && c.ProductId == request.ProductId);

            if (cartItem == null)
                return NotFound(new { message = "Ürün sepette bulunamadı" });

            _context.Carts.Remove(cartItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Ürün sepetten çıkarıldı" });
        }

        // GET: cart/check?userId=1&productId=5
        [HttpGet("check")]
        public async Task<IActionResult> CheckCart([FromQuery] int userId, [FromQuery] int productId)
        {
            var inCart = await _context.Carts
                .AnyAsync(c => c.UserId == userId && c.ProductId == productId);

            return Ok(new { inCart });
        }

        // GET: cart/user/15
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetCartByUser(int userId)
        {
            var cartItems = await _context.Carts
                .Where(c => c.UserId == userId)
                .Include(c => c.Product)
                .ToListAsync();

            var result = cartItems.Select(c => new CartItemDto
            {
                Id = c.Product.Id,
                Name = c.Product.Name,
                Price = c.Product.Price,
                Rate = c.Product.Rate ?? 0, 
                Stock = c.Product.Stock,
                Image = c.Product.Image != null ? c.Product.Image.ToList() : new List<string>(), 
                Quantity = c.Quantity
            });


            return Ok(result);
        }
    }
}

