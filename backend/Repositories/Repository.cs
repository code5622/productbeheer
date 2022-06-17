using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Store.Repositories
{
    public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly ApplicationDbContext Context;
        protected DbSet<TEntity> _Entity;

        public Repository(ApplicationDbContext db)
        {
            Context = db;
            _Entity = db.Set<TEntity>();
        }

        public async Task<TEntity> Get(int id)
        {
            return await _Entity.FindAsync(id);
        }

        public async Task<List<TEntity>> GetAll()
        {
            return await _Entity.ToListAsync();
        }

        public async Task<TEntity> Add(TEntity entity)
        {
            Context.Entry(entity).State = EntityState.Modified;
            await _Entity.AddAsync(entity);
            await Context.SaveChangesAsync();
            return entity;
        }

        public async Task<TEntity> Update(TEntity entity) 
        {
            Context.Entry(entity).State = EntityState.Modified;
            await Context.SaveChangesAsync();
            return entity;
        }

        public async Task<TEntity> Remove(int id)
        {
            var entity = await this.Get(id);
            _Entity.Remove(entity);
            await Context.SaveChangesAsync();
            return entity;
        }
    }
}