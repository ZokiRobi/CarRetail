using System.Threading.Tasks;
using CarShop.Core.Models.CarModels;
using CarShop.Data;
using Microsoft.AspNetCore.Mvc;

namespace CarShop.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly ICarRepository repository;
        private readonly CarShopDbContext context;

        public CarsController(ICarRepository repository, CarShopDbContext context)
        {
            this.repository = repository;
            this.context = context;
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
        public async Task<IActionResult> GetManufacturers()
        {
            CarApiController controller = new CarApiController();
            var result = await controller.GetManufacturersSelectListItems();
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