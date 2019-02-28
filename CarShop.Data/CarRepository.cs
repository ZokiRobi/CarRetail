using CarShop.Core.Models.CarModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace CarShop.Data
{
    public class CarRepository : Repository<Car>, ICarRepository
    {
        public CarRepository(CarShopDbContext context) : base(context)
        {

        }
    }
}
