namespace ECommerceApi.Models;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Users")] // Veritabanı tablosunun ismi
public class User
{
    [Column("id")]
    public int Id { get; set; }

    [Column("username")]
    public string Username { get; set; }

    [Column("password")]
    public string PasswordHash { get; set; }

    [Column("role")]
    public string Role { get; set; }

    [Column("createdAt")]
    public DateTime CreatedAt { get; set; }

    [Column("updatedAt")]
    public DateTime UpdatedAt { get; set; }

    [Column("email")]
    public string Email { get; set; }

    // Bir kullanıcının birçok favorisi olabilir
    public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
    public ICollection<Cart> Carts { get; set; } = new List<Cart>();
}
