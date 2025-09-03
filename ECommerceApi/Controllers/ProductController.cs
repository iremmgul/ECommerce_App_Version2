using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerceApi.Data;
using ECommerceApi.Models;

namespace ECommerceApi.Controllers
{
    [ApiController]
    [Route("products")]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }

        // GET /products/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
                return NotFound(new { message = "Ürün bulunamadı" });

            return Ok(product);
        }

        // GET /products?search=...&page=...&limit=...
        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int limit = 5)
        {
            var query = _context.Products.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(p =>
                    EF.Functions.ILike(p.Name, $"{search}%") ||
                    EF.Functions.ILike(p.Description, $"{search}%"));
            }

            var totalCount = await query.CountAsync();

            var products = await query
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            return Ok(new
            {
                products,
                totalCount,
                totalPages = (int)Math.Ceiling((double)totalCount / limit),
                currentPage = page
            });
        }

        //GET /products/{id}/reviews
        [HttpGet("{id}/reviews")]
        public async Task<IActionResult> GetProductReviews(int id)
        {
            try
            {
                var reviews = await _context.ProductReviews
                    .Where(r => r.ProductId == id)
                    .Join(_context.Users,
                          review => review.UserId,
                          user => user.Id,
                          (review, user) => new
                          {
                              id = review.Id,
                              productId = review.ProductId,
                              userId = review.UserId,
                              userName = user.Username,
                              rating = review.Rating,
                              comment = review.Comment,
                              createdAt = review.CreatedAt
                          })
                    .OrderByDescending(r => r.createdAt)
                    .ToListAsync();

                 return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Yorumlar alınırken hata oluştu" });
            }
        }
    }
}
