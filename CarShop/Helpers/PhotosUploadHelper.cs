using CarShop.Core.Models.CarModels;
using CarShop.Data;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace CarShop.Helpers
{
    public class PhotosUploadHelper
    {
        private readonly CarShopDbContext dbContext;
        private readonly Cloudinary cloudinary;

        public PhotosUploadHelper(CarShopDbContext dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;

            var cloudConfig = configuration.Get<CloudinarySettings>();
            Account acc = new Account { ApiKey = cloudConfig.ApiKey, ApiSecret = cloudConfig.ApiSecret, Cloud = cloudConfig.CloudName };

            cloudinary = new Cloudinary(acc);
        }


        public IList<CarPhoto> UploadPictures(IList<IFormFile> photos)
        {
            var uploadResult = new ImageUploadResult();

            var carPhotos = new List<CarPhoto>();

            if (photos.Count > 0)
            {
                for (int i = 0; i < photos.Count; i++)
                {

                    using (var stream = photos[i].OpenReadStream())
                    {
                        var uploadParams = new ImageUploadParams()
                        {
                            File = new FileDescription(photos[i].Name, stream),
                            Transformation = new Transformation().Width(500).Height(500)
                        };

                        uploadResult = cloudinary.Upload(uploadParams);
                        carPhotos.Add(new CarPhoto { Url = uploadResult.Uri.AbsolutePath });
                    }
                }
            }

            return carPhotos;
        }

        public async void AddUrlsToDatabase(IList<CarPhoto> photos)
        {
            await dbContext.CarPhotos.AddRangeAsync(photos);
        }

    }
}
