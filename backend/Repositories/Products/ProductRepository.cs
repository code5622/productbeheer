using System.Threading.Tasks;
using Store.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;

namespace Store.Repositories
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        public ProductRepository(ApplicationDbContext db) : base(db)
        {

        }

        public async Task<List<Product>> AmountGreaterThan(int amount)
        {
            return await this._Entity
                             .Where(p => p.Amount >= amount)
                             .ToListAsync();
        }
    }
}
