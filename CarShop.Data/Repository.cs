using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarShop.Data
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly CarShopDbContext dbContext;

        public Repository(CarShopDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await dbContext.Set<T>().ToListAsync();
        }

        public async Task<T> Add(T entity)
        {
            dbContext.Set<T>().Add(entity);
            return await Task.FromResult(entity);
        }

        public async Task<T> Update(T entity)
        {
            dbContext.Set<T>().Update(entity);
            return await Task.FromResult(entity);
        }

        public async Task<T> Delete(T entity)
        {
            dbContext.Set<T>().Remove(entity);
            return await Task.FromResult(entity);
        }
        public async Task<int> Commit()
        {
            return await dbContext.SaveChangesAsync();
        }
    }
}
