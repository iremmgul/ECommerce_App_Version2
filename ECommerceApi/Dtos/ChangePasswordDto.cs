using System.Text.Json.Serialization;

namespace ECommerceApi.Dtos
{
    public class ChangePasswordDto
    {
        [JsonPropertyName("password")]
        public string NewPassword { get; set; } = string.Empty;
    }

}
