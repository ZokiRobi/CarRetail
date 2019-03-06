using CarShop.Core.Models.CarModels;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarShop.Helpers
{
    public static class Extensions
    {
        /// <summary>
        /// Returns an array of objects with properties id and text, for select.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="items">List of items for select</param>
        /// <returns></returns>
        public static async Task<object[]> GetMakesSelectListObjectItems<T>(this Task<List<T>> items) where T : ICarEntity
        {

            var itemsFromDb = await items;

            if (itemsFromDb.Any())
            {
                var itemsCount = itemsFromDb.Count();
                var selectItems = new object[itemsCount];

                for (int i = 0; i < itemsCount; i++)
                {
                    selectItems[i] = new { id = itemsFromDb.ElementAt(i).Id, text = itemsFromDb.ElementAt(i).Title };
                }

                return await Task.FromResult(selectItems);
            }
            else
            {
                return await Task.FromResult(new object[] { });
            }

        }
    }
}
