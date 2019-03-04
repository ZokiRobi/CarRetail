namespace CarShop.Core.Models.CarModels
{
    public class CarManufacturer : ICarEntity
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Title { get; set; }
    }
}
