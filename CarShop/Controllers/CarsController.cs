using System.Threading.Tasks;
using CarShop.Core.Models.CarModels;
using CarShop.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
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

        [Route("GetCarById/{carId}")]
        [HttpGet]
        public async Task<IActionResult> GetSingleCar(int carId)
        {
            return new JsonResult(await repository.GetById(carId));
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

        //public void PopulateManufacturersTable()
        //{
        //    string path = appEnvironment.WebRootPath;
        //    path = Path.Combine(path, "AllMakes.csv");
        //    var manList = new List<CarManufacturer>();

        //    using (var reader = new StreamReader(path))
        //    {
        //        while (!reader.EndOfStream)
        //        {
        //            var row = reader.ReadLine().Split(',');
        //            if (!row[0].Equals("make_id"))
        //            {
        //                manList.Add(new CarManufacturer { Id = int.Parse(row[0]), Title = row[1] });
        //            }
        //        }

        //    }

        //    if (manList.Any())
        //    {
        //        context.CarManufacturers.AddRange(manList);
        //        context.SaveChanges();
        //    }
        //}

    }
}