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
        // Yeni ürün ekler veya varsa quantity'yi artırır
        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] CartDto request)
        {
            if (request.UserId <= 0 || request.ProductId <= 0 || request.Quantity <= 0)
            {
                return BadRequest(new { message = "Geçersiz istek" });
            }

            var cartItem = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == request.UserId && c.ProductId == request.ProductId);

            if (cartItem != null)
            {
                cartItem.Quantity += request.Quantity;
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Ürün sepetteki adedi artırıldı",
                    productId = cartItem.ProductId,
                    quantity = cartItem.Quantity
                });
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

                return Ok(new
                {
                    message = "Ürün sepete eklendi",
                    productId = newItem.ProductId,
                    quantity = newItem.Quantity
                });
            }
        }

        // PUT: cart
        // Sepetteki ürünün quantity'sini doğrudan günceller
        [HttpPut]
        public async Task<IActionResult> UpdateCartItem([FromBody] CartDto request)
        {
            if (request.UserId <= 0 || request.ProductId <= 0)
            {
                return BadRequest(new { message = "Geçersiz istek" });
            }

            var cartItem = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == request.UserId && c.ProductId == request.ProductId);

            if (cartItem == null)
                return NotFound(new { message = "Ürün sepette bulunamadı" });

            if (request.Quantity <= 0)
            {
                // Quantity <= 0 → ürünü sil
                _context.Carts.Remove(cartItem);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Ürün sepetten çıkarıldı" });
            }

            // Quantity doğrudan set ediliyor
            cartItem.Quantity = request.Quantity;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Ürün adedi güncellendi",
                productId = cartItem.ProductId,
                quantity = cartItem.Quantity
            });
        }

        // DELETE: cart
        // Ürünü sepetten tamamen siler
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

        // GET: cart/user/{userId}
        // Kullanıcının sepetini getirir
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


/*
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
            if (request.UserId <= 0 || request.ProductId <= 0 || request.Quantity <= 0)
            {
                return BadRequest(new { message = "Geçersiz istek" });
            }

            var cartItem = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == request.UserId && c.ProductId == request.ProductId);

            if (cartItem != null)
            {
                cartItem.Quantity += request.Quantity;
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    message = "Ürün sepetteki adedi artırıldı",
                    productId = cartItem.ProductId,
                    quantity = cartItem.Quantity
                });
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

                return Ok(new
                {
                    message = "Ürün sepete eklendi",
                    productId = newItem.ProductId,
                    quantity = newItem.Quantity
                });
            }
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
*/