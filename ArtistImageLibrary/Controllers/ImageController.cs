using ArtistImageLibrary.Interfaces.Services;
using ArtistImageLibrary.ServiceModels;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
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
            try
            {
                return _imageService.ListImagesByPage(page, pageSize);
            }
            catch(Exception e)
            {
                _logger.Error(e, $"An error has occurred while fetching images from page {page}");
                throw;
            }
        }

        [HttpDelete]
        public IActionResult Delete(string path)
        {
            try
            {
                _imageService.DeleteImage(System.Web.HttpUtility.UrlDecode(path));
                return Ok();
            }
            catch (Exception e)
            {
                _logger.Error(e, $"An error has occurred while deleting the image on folder {path}");
                throw;
            }
        }
    }
}
