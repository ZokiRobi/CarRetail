using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CarShop.Core.Models.CarModels;
using CarShop.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using Microsoft.EntityFrameworkCore;
using CarShop.Helpers;

namespace CarShop.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly ICarRepository repository;
        private readonly CarShopDbContext context;
        private readonly IHostingEnvironment appEnvironment;

        public CarsController(ICarRepository repository, CarShopDbContext context, IHostingEnvironment appEnvironment)
        {
            this.repository = repository;
            this.context = context;
            this.appEnvironment = appEnvironment;
        }

        [Route("GetAllCars")]
        [HttpGet]
        public async Task<IActionResult> GetAllCars()
        {
            return new JsonResult(await repository.GetAll());
        }

        [Route("AddCar")]
        [HttpPost]
        public async Task<IActionResult> AddCar(Car car)
        {
            if (ModelState.IsValid)
            {
                await repository.Add(car);
                await repository.Commit();
            }

            return new JsonResult(car);
        }

        [Route("GetManufacturers")]
        [ResponseCache(Duration = 10000)]
        public async Task<IActionResult> GetManufacturers()
        {
            var result = await context.CarManufacturers.AsNoTracking().ToListAsync().GetMakesSelectListObjectItems();

            return new JsonResult(result);
        }

        [Route("GetModelsByManufacturerId/{manufacturerId}")]
        public async Task<IActionResult> GetModelsByManufacturerId(int manufacturerId)
        {
            CarApiController controller = new CarApiController();
            var result = await controller.GetModelsSelectListItems(manufacturerId);
            return new JsonResult(result);
        }

    }
}