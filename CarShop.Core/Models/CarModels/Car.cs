using System.ComponentModel.DataAnnotations;
namespace CarShop.Core.Models.CarModels
{
    public class Car
    {
        public int Id { get; set; }

        [Required]
        public int CarManufacturerId { get; set; }

        public string CarManufacturerName { get; set; }

        [Required]
        public int CarModelId { get; set; }

        public string CarModelName { get; set; }

        public string Description { get; set; }

        public bool FixedPrice { get; set; }

        public double Price { get; set; }
    }
}
