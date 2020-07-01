using ArtistImageLibrary.Entities;
using ArtistImageLibrary.Interfaces.DataAccess;
using ArtistImageLibrary.Interfaces.Services;
using ArtistImageLibrary.Services;
using Moq;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;

namespace ArtistImageLibrary.Tests
{
    public class ImageTest
    {
        private IImageService _imageService;

        [SetUp]
        public void Setup()
        {
            #region Mock Setup
            var mockDataAccess = new Mock<IImageStorageDataAccess>();
            var images = new List<Image>()
            {
                new Image()
                {
                    Path = "/Files/Images/user1/a.png"
                },
                new Image()
                {
                    Path = "/Files/Images/user1/b.png"
                },
                new Image()
                {
                    Path = "/Files/Images/user1/c.png"
                },
                new Image()
                {
                    Path = "/Files/Images/user1/z.png"
                },
                new Image()
                {
                    Path = "/Files/Images/user1/d.png"
                },
                new Image()
                {
                    Path = "/Files/Images/user1/e.png"
                },
            };

            mockDataAccess.Setup(x => x.ListImages(0, 4))
                          .Returns(images.OrderByDescending(image => image.Path).Skip(0).Take(4));
            mockDataAccess.Setup(x => x.CountImages())
                          .Returns(images.Count);
            #endregion

            _imageService = new ImageService(mockDataAccess.Object);
        }

        [Test]
        public void ListFirstPageOfSizeFour()
        {
            var imageCollection = _imageService.ListImagesByPage(1, 4);

            Assert.AreEqual(2, imageCollection.PageCount);
            Assert.AreEqual(4, imageCollection.Images.Count());

            #region Assert list members
            Assert.AreEqual("/Files/Images/user1/z.png", imageCollection.Images.ElementAt(0).Path);
            Assert.AreEqual("/Files/Images/user1/e.png", imageCollection.Images.ElementAt(1).Path);
            Assert.AreEqual("/Files/Images/user1/d.png", imageCollection.Images.ElementAt(2).Path);
            Assert.AreEqual("/Files/Images/user1/c.png", imageCollection.Images.ElementAt(3).Path);
            #endregion

            Assert.Pass();
        }
    }
}