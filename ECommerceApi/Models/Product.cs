using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerceApi.Models
{
    [Table("products", Schema = "public")]
    public class Product
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Column("description")]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Column("price")]
        public decimal Price { get; set; }

        [Column("rate")]
        public float? Rate { get; set; }

        [Column("stock")]
        public int Stock { get; set; }

        [Column("image")]
        public string[] Image { get; set; } = [];

        // Bir ürün birçok kullanıcı tarafından favorilenebilir
        public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
        public ICollection<Cart> Carts { get; set; } = new List<Cart>();

    }
}


