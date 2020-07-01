using ArtistImageLibrary.Entities;
using ArtistImageLibrary.Interfaces.DataAccess;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace ArtistImageLibrary.DataAccess
{
    public class FileSystemImageStorageDataAccess : IImageStorageDataAccess
    {
        public int CountImages()
        {
            var pathToSearch = $"{GetApplicationRoot()}/Files/Images/user1";

            return Directory.GetFiles(pathToSearch).Length;
        }

        public IEnumerable<Image> ListImages(int skip, int take)
        {
            var root = GetApplicationRoot();
            var pathToSearch = $"{root}/Files/Images/user1";
            var imagePaths = Directory.GetFiles(pathToSearch);

            return imagePaths.Skip(skip).Take(take).Select(imagePath => new Image() { Name = imagePath.Replace("\\", "/").Split('/').Last(), Path = imagePath.Replace(root, "").Replace("\\", "/") });
        }

        private string GetApplicationRoot()
        {
            var assemblyPath = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().CodeBase);

            Regex appPathMatcher = new Regex(@"(?<!fil)[A-Za-z]:\\+[\S\s]*?(?=\\+bin)");
            var appRoot = appPathMatcher.Match(assemblyPath).Value;

            return $"{appRoot}/ClientApp/public";
        }
    }
}
