using System.ComponentModel.DataAnnotations;
namespace CarShop.Core.Models.CarModels
{
    public enum CarFuelType
    {
        Petrol,
        Diesel,
        Electric,
        Ethanol,
        [Display(Name = "Natural Gas")]
        NaturalGas,
        LPG,
        Other
    }
}
