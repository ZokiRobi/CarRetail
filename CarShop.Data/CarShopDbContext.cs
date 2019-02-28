using CarShop.Core.Models.CarModels;
using Microsoft.EntityFrameworkCore;

namespace CarShop.Data
{
    public class CarShopDbContext : DbContext
    {
        public DbSet<Car> Cars { get; set; }
        public DbSet<CarModel> CarModels { get; set; }
        public DbSet<CarManufacturer> CarManufacturers { get; set; }

        public CarShopDbContext(DbContextOptions<CarShopDbContext> options) : base(options)
        {

        }
    }
}
