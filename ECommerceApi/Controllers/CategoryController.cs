using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerceApi.Data;
using ECommerceApi.Models;

namespace ECommerceApi.Controllers
{
    [ApiController]
    [Route("categories")]
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoryController(AppDbContext context)
        {
            _context = context;
        }

        // GET /categories
        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var categories = await _context.Categories.ToListAsync();
            return Ok(categories);
        }

        // GET /categories/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category = await _context.Categories
                .Include(c => c.ProductCategories)
                .ThenInclude(pc => pc.Product)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
                return NotFound(new { message = "Kategori bulunamadı" });

            return Ok(category);
        }

        // GET /categories/{id}/products
        [HttpGet("{id}/products")]
        public async Task<IActionResult> GetProductsByCategory(int id, [FromQuery] int page = 1, [FromQuery] int limit = 5)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound(new { message = "Kategori bulunamadı" });

            var query = _context.ProductCategories
                .Where(pc => pc.CategoryId == id)
                .Select(pc => pc.Product);

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
    }
}
