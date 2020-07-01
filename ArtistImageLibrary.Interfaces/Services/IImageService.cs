using ArtistImageLibrary.ServiceModels;
using System.IO;

namespace ArtistImageLibrary.Interfaces.Services
{
    public interface IImageService
    {
        ImageCollection ListImagesByPage(int page, int pageSize);
        void DeleteImage(string path);
        void SaveImage(Stream fileStream, string extension);
    }
}
