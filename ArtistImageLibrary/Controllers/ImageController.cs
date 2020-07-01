using ArtistImageLibrary.Interfaces.Services;
using ArtistImageLibrary.ServiceModels;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Linq;

namespace ArtistImageLibrary.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IImageService _imageService;

        public ImageController(ILogger logger, IImageService imageService)
        {
            _logger = logger;
            _imageService = imageService;
        }

        [HttpGet]
        public ImageCollection Get(int page, int pageSize)
        {
            return _imageService.ListImagesByPage(page, pageSize);
        }
    }
}
