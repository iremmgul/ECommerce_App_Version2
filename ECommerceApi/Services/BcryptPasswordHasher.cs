using BCryptNet = BCrypt.Net.BCrypt;

namespace ECommerceApi.Services
{
    public class BcryptPasswordHasher : IPasswordHasher
    {
        public string HashPassword(string password)
        {
            return BCryptNet.HashPassword(password);
        }

        public bool VerifyPassword(string hashedPassword, string inputPassword)
        {
            // BCrypt.Verify(plain, hashed)
            return BCryptNet.Verify(inputPassword, hashedPassword);
        }
    }
}