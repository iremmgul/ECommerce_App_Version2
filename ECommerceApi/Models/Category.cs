using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerceApi.Models
{
    [Table("category", Schema = "public")]
    public class Category
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        // İlişki: Category ↔ ProductCategory
        public ICollection<ProductCategory> ProductCategories { get; set; } = new List<ProductCategory>();
    }
}