using System.Linq;

namespace ArtistImageLibrary.Entities
{
    public class Image
    {
        public string Path { get; set; }

        public string Name { get
            {
                return Path.Split('/').Last();
            }
        }
    }
}
