using ArtistImageLibrary.Entities;
using System;
using System.Collections.Generic;

namespace ArtistImageLibrary.ServiceModels
{
    public class ImageCollection
    {
        public IEnumerable<Image> Images { get; set; }
        public int PageSize { get; set; }
        public int PageCount { get; set; }
    }
}
