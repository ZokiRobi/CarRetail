using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarShop.Data
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> Add(T entity);
        Task<T> Update(T entity);
        Task<T> Delete(T entity);
        Task<int> Commit();
    }
}
