using System;
using System.ComponentModel.DataAnnotations;

namespace ECommerceApi.Models
{
    public class Order
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public int UserId { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "TRY";
        public string Status { get; set; } = "pending"; // pending | paid | failed
        public string BasketJson { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}

