using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace CarShop.Data
{
    public class CarShopDbContext : DbContext
    {
        public CarShopDbContext(DbContextOptions<CarShopDbContext> options) : base(options)
        {

        }
    }
}
