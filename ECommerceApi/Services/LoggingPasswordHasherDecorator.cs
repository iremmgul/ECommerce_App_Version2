namespace ECommerceApi.Services
{
    public class LoggingPasswordHasherDecorator : IPasswordHasher
    {
        private readonly BcryptPasswordHasher _inner;

        public LoggingPasswordHasherDecorator(BcryptPasswordHasher inner)
        {
            _inner = inner;
        }

        public string HashPassword(string password)
        {
            Console.WriteLine("[HASH] Şifre hashleniyor...");
            var hashed = _inner.HashPassword(password);
            var preview = !string.IsNullOrEmpty(hashed) && hashed.Length > 10 ? hashed[..10] : hashed;
            Console.WriteLine($"[HASHED] Sonuç: {preview}...");
            return hashed;
        }

        public bool VerifyPassword(string hashedPassword, string inputPassword)
        {
            Console.WriteLine("[VERIFY] Şifre doğrulanıyor...");
            var ok = _inner.VerifyPassword(hashedPassword, inputPassword);
            Console.WriteLine($"[VERIFY] Doğrulama sonucu: {ok}");
            return ok;
        }
    }
}

