using System;
using System.Collections.Generic;
using System.Text;

namespace CarShop.Core.Models.CarModels
{
    public interface ICarEntity
    {
        int Id { get; set; }
        string Title { get; set; }
    }
}
