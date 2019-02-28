namespace CarShop.Core.Models.CarModels
{
    public class CarPhoto
    {
        public int Id { get; set; }
        public int CarId { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
    }
}
