using ECommerceApi.Models;
using System.ComponentModel.DataAnnotations.Schema;

[Table("product_category", Schema = "public")]
public class ProductCategory
{
    [Column("product_id")]
    public int ProductId { get; set; }
    public Product Product { get; set; }

    [Column("category_id")]
    public int CategoryId { get; set; }
    public Category Category { get; set; }
}
