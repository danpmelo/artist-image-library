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
        public FileSystemImageStorageDataAccess()
        {
            var filesDirectory = $"{GetApplicationRoot()}/Files/Images/user1";
            if (!Directory.Exists(filesDirectory))
            {
                Directory.CreateDirectory(filesDirectory);
            }
        }

        public int CountImages()
        {
            var pathToSearch = $"{GetApplicationRoot()}/Files/Images/user1";

            return Directory.GetFiles(pathToSearch).Length;
        }

        public void Delete(string path)
        {
            var root = GetApplicationRoot();
            if (File.Exists($"{root}{path}"))
            {
                File.Delete($"{root}{path}");
            }
        }

        public IEnumerable<Image> ListImages(int skip, int take)
        {
            var root = GetApplicationRoot();
            var pathToSearch = $"{root}/Files/Images/user1";
            var imagePaths = Directory.GetFiles(pathToSearch);

            return imagePaths.OrderByDescending(fileName => fileName).Skip(skip).Take(take).Select(imagePath => new Image() { Path = imagePath.Replace(root, "").Replace("\\", "/") });
        }

        public void SaveImage(string fileName, string extension, Stream fileStream)
        {
            var baseFileName = fileName;
            var path = $"{GetApplicationRoot()}/Files/Images/user1";

            for (int index = 0; File.Exists($"{path}/{fileName}.{extension}"); ++index)
            {
                fileName = $"{baseFileName}{index}";
            }

            using (var file = File.Create($"{path}/{fileName}.{extension}"))
            {
                fileStream.Seek(0, SeekOrigin.Begin);
                fileStream.CopyTo(file);
            }
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
