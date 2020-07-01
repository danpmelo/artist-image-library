using ArtistImageLibrary.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace ArtistImageLibrary.Interfaces.DataAccess
{
    public interface IImageStorageDataAccess
    {
        IEnumerable<Image> ListImages(int skip, int take);
        int CountImages();
        void Delete(string path);
        void SaveImage(string fileName, string extension, Stream fileStream);
    }
}
