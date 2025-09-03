using ECommerceApi.Models;
using Microsoft.EntityFrameworkCore; 

namespace ECommerceApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<ProductReview> ProductReviews { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Tablo adları (PostgreSQL case-sensitive)
            modelBuilder.Entity<User>().ToTable("Users", "public");
            modelBuilder.Entity<Product>().ToTable("products", "public");
            modelBuilder.Entity<Favorite>().ToTable("favorites", "public");
            modelBuilder.Entity<Cart>().ToTable("carts", "public");
            modelBuilder.Entity<Category>().ToTable("category", "public");
            modelBuilder.Entity<ProductCategory>().ToTable("product_category", "public");
            modelBuilder.Entity<ProductReview>().ToTable("product_review", "public");

            // Favorite - Product ilişkisi
            modelBuilder.Entity<Favorite>()
                .HasOne(f => f.Product)
                .WithMany(p => p.Favorites)
                .HasForeignKey(f => f.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            // Favorite - User ilişkisi
            modelBuilder.Entity<Favorite>()
                .HasOne(f => f.User)
                .WithMany(u => u.Favorites)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Cart - Product ilişkisi
            modelBuilder.Entity<Cart>()
                .HasOne(c => c.Product)
                .WithMany(p => p.Carts)
                .HasForeignKey(c => c.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            // Cart - User ilişkisi
            modelBuilder.Entity<Cart>()
                .HasOne(c => c.User)
                .WithMany(u => u.Carts)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            
            modelBuilder.Entity<ProductReview>(entity =>
            {
                entity.ToTable("product_review"); // tablo adı doğru olsun
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                      .HasColumnName("id"); // burada küçük harfe mapliyoruz

                entity.Property(e => e.ProductId)
                      .HasColumnName("product_id");

                entity.Property(e => e.UserId)
                      .HasColumnName("user_id");

                entity.Property(e => e.Comment)
                      .HasColumnName("comment");

                entity.Property(e => e.Rating)
                      .HasColumnName("rating");

                entity.Property(e => e.CreatedAt)
                      .HasColumnName("created_at");
            });


            // ProductReview - Product ilişkisi
            modelBuilder.Entity<ProductCategory>()
            .HasKey(pc => new { pc.ProductId, pc.CategoryId });




        }
    }
}





