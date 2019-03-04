using CarShop.Helpers.JsonModels;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace CarShop.Controllers
{
    public class CarApiController
    {
        public async Task<string> GetManufacturersJSON()
        {
            var apiUrl = "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json";
            string result = string.Empty;

            using (var wc = new WebClient())
            {
                result = await wc.DownloadStringTaskAsync(new Uri(apiUrl));
            }

            return await Task.FromResult(result);
        }

        public async Task<string> GetModelsByIdJSON(int id)
        {
            var apiUrl = $"https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/{id}?format=json";
            string result = string.Empty;

            using (var wc = new WebClient())
            {
                result = await wc.DownloadStringTaskAsync(new Uri(apiUrl));
            }

            return await Task.FromResult(result);
        }

        public async Task<object[]> GetManufacturersSelectListItems()
        {
            var manufacturers = await GetManufacturersJSON();

            JObject jObject = JObject.Parse(manufacturers);
            var Result = jObject["Results"].Children().ToList();

            var selectItems = new object[Result.Count];

            for (int i=0;i<Result.Count;i++)
            {
                ManufacturerModel model = Result[i].ToObject<ManufacturerModel>();
                selectItems[i] = new { id = model.Make_ID, text = model.Make_Name };
            }

            return await Task.FromResult(selectItems);
        }

        public async Task<object[]> GetModelsSelectListItems(int id)
        {
            var models = await GetModelsByIdJSON(id);
            JObject jObject = JObject.Parse(models);
            var Result = jObject["Results"].Children().ToList();

            var selectItems = new object[Result.Count];

            for (int i = 0; i < Result.Count; i++)
            {
                CarModelModel model = Result[i].ToObject<CarModelModel>();
                selectItems[i] = new { id = model.Model_ID, text = model.Model_Name};
            }

            return await Task.FromResult(selectItems);
        }

    }
}
