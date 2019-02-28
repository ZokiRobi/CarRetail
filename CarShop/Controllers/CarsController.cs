using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarShop.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarShop.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly ICarRepository repository;

        public CarsController(ICarRepository repository)
        {
            this.repository = repository;
        }

        [Route("GetAllCars")]
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            return new JsonResult(await repository.GetAll());
        }
    }
}