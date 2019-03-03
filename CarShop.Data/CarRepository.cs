using CarShop.Core.Models.CarModels;

namespace CarShop.Data
{
    public class CarRepository : Repository<Car>, ICarRepository
    {
        public CarRepository(CarShopDbContext context) : base(context)
        {

        }
    }
}
