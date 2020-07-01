using ArtistImageLibrary.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace ArtistImageLibrary.Interfaces.DataAccess
{
    public interface IImageStorageDataAccess
    {
        IEnumerable<Image> ListImages(int skip, int take);
        int CountImages();
    }
}
