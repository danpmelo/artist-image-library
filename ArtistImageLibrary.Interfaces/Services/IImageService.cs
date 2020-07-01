using ArtistImageLibrary.ServiceModels;

namespace ArtistImageLibrary.Interfaces.Services
{
    public interface IImageService
    {
        ImageCollection ListImagesByPage(int page, int pageSize);
        void DeleteImage(string path);
    }
}
