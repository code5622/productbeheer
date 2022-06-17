using System.Collections.Generic;
using System.Threading.Tasks;
using Store.Models;

namespace Store.Repositories
{
    public interface IProductRepository: IRepository<Product>
    {
        public Task<List<Product>> AmountGreaterThan(int amount);
    }
}
