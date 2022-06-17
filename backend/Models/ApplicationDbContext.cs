using Microsoft.EntityFrameworkCore;
using Store.Models;

namespace Store.Repositories
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext() : base() {}

        public ApplicationDbContext(DbContextOptions options) : base(options)  {}

        public DbSet<Product> Products { get; set; }
    }
}
