using System.ComponentModel.DataAnnotations;
namespace CarShop.Core.Models.CarModels
{
    public class CarModel
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Title { get; set; }
        public int CarTypeId { get; set; }
    }
}
