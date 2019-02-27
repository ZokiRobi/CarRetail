using System.ComponentModel.DataAnnotations;
namespace CarShop.Core.Models.CarModels
{
    public enum CarVehicleType
    {
        [Display(Name = "Cabriolet / Roadster")]
        CabrioletRoadster,
        [Display(Name = "Estate Car")]
        EstateCar,
        Saloon,
        [Display(Name = "Small Car")]
        SmallCar,
        [Display(Name = "Sports Car / Coupe")]
        SportsCar,
        [Display(Name = "SUV / Off-road Vehicle / Pickup Truck")]
        SUV,
        [Display(Name = "Van / Minibus")]
        Van,
        Other
    }
}
