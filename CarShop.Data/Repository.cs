using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CarShop.Data
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly CarShopDbContext dbContext;

        public Repository(CarShopDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IQueryable<TEntity>> GetAll()
        {
            var res = dbContext.Set<TEntity>().AsNoTracking();
            return await Task.FromResult(res);
        }

        public async Task<TEntity> GetById(int id)
        {
            return await dbContext.Set<TEntity>().FindAsync(id);
        }

        public async Task<TEntity> Add(TEntity entity)
        {
            dbContext.Set<TEntity>().Add(entity);
            return await Task.FromResult(entity);
        }

        public async Task<TEntity> Update(TEntity entity)
        {
            dbContext.Set<TEntity>().Update(entity);
            return await Task.FromResult(entity);
        }

        public async Task<TEntity> Delete(TEntity entity)
        {
            dbContext.Set<TEntity>().Remove(entity);
            return await Task.FromResult(entity);
        }
        public async Task<int> Commit()
        {
            return await dbContext.SaveChangesAsync();
        }
    }
}
