namespace ECommerceApi.Dtos
{
    public class CartItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public float Rate { get; set; }
        public int Stock { get; set; }
        public List<string> Image { get; set; }
        public int Quantity { get; set; }
    }
}

