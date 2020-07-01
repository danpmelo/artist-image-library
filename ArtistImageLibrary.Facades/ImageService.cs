using ArtistImageLibrary.Interfaces.DataAccess;
using ArtistImageLibrary.Interfaces.Services;
using ArtistImageLibrary.ServiceModels;
using System;
using System.IO;

namespace ArtistImageLibrary.Services
{
    public class ImageService : IImageService
    {
        private readonly IImageStorageDataAccess _imageDataAccess;

        public ImageService(IImageStorageDataAccess imageDataAccess)
        {
            _imageDataAccess = imageDataAccess;
        }

        public void DeleteImage(string path)
        {
            _imageDataAccess.Delete(path);
        }

        public ImageCollection ListImagesByPage(int page, int pageSize)
        {
            return new ImageCollection()
            {
                Images = _imageDataAccess.ListImages((page - 1) * pageSize, pageSize),
                PageSize = pageSize,
                PageCount = (int)Math.Ceiling((double)_imageDataAccess.CountImages() / pageSize)
            };
        }

        public void SaveImage(Stream fileStream, string extension)
        {
            _imageDataAccess.SaveImage(DateTime.UtcNow.ToString("yyyyMMddHHmmssfff"), extension, fileStream);
        }
    }
}
