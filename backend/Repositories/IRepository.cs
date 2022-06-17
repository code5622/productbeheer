using System.Collections.Generic;
using System.Threading.Tasks;


namespace Store.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        public Task<TEntity> Get(int id);
        public Task<List<TEntity>> GetAll();
        public Task<TEntity> Add(TEntity entity);
        public Task<TEntity> Update(TEntity entity);
        public Task<TEntity> Remove(int id);
    }
}
