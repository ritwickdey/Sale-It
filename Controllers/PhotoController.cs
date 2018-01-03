using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SaleIt.Controllers.Resources;
using SaleIt.Core;
using SaleIt.Core.Models;

namespace SaleIt.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotoController : Controller
    {
        private readonly int MAX_BYTES = 1024 * 1024;
        private readonly string[] ACCEPTED_FILE_TYPES = new []
        {
            ".jpg",
            ".jpeg",
            ".png"
        };
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public PhotoController(
            IHostingEnvironment host,
            IVehicleRepository repository,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.repository = repository;
            this.host = host;
        }

        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            if (file == null) return BadRequest(new { error = "Null File" });
            if (file.Length == 0) return BadRequest(new { error = "Empty File" });
            if (!ACCEPTED_FILE_TYPES.Any(s => s == Path.GetExtension(file.FileName)))
                return BadRequest(new { error = $"Unsupported File. Supported files are {String.Join(", ", ACCEPTED_FILE_TYPES).ToUpper()}" });
            if (file.Length > MAX_BYTES) return BadRequest(new { error = "File Size exceeds 1MB" });

            var vehicle = await repository.GetVehicleAsync(vehicleId, includeRelated: false);

            if (vehicle == null)
                return NotFound();

            var uploadFolderPath = Path.Combine(host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadFolderPath))
                Directory.CreateDirectory(uploadFolderPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(uploadFolderPath, fileName);

            using(var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            var photo = new Photo { FileName = fileName };
            vehicle.Photos.Add(photo);
            await unitOfWork.CompleteAsync();
            var photoResource = mapper.Map<Photo, PhotoResource>(photo);
            return Ok(photoResource);
        }
    }
}