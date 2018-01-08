using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SaleIt.Controllers.Resources;
using SaleIt.Controllers.Resources.Policy;
using SaleIt.Core;
using SaleIt.Core.Models;

namespace SaleIt.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotoController : Controller
    {
        private readonly IHostingEnvironment host;
        private readonly PhotoSettings photoSettings;
        private readonly IVehicleRepository repository;
        private readonly IPhotoRepository photoRepository;
        private readonly IMapper mapper;
        private readonly IPhotoService photoService;

        public PhotoController(
            IHostingEnvironment host,
            IVehicleRepository repository,
            IPhotoRepository photoRepository,
            IMapper mapper,
            IPhotoService photoService,
            IOptionsSnapshot<PhotoSettings> options)
        {
            this.mapper = mapper;
            this.repository = repository;
            this.photoRepository = photoRepository;
            this.host = host;
            this.photoSettings = options.Value;
            this.photoService = photoService;
        }

        [HttpPost]
        [Authorize(Policies.RequriedModeratorRole)]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            if (file == null)
                return BadRequest(new { error = "Null File" });

            if (file.Length == 0)
                return BadRequest(new { error = "Empty File" });

            if (!photoSettings.IsSupported(Path.GetExtension(file.FileName)))
                return BadRequest(new { error = $"Unsupported File. Supported files are {String.Join(", ", photoSettings.SupportedFilesType).ToUpper()}" });

            if (file.Length > photoSettings.MaxBytes)
                return BadRequest(new { error = "File Size exceeds 1MB" });

            var vehicle = await repository.GetVehicleAsync(vehicleId, includeRelated: false);

            if (vehicle == null)
                return NotFound();

            var uploadFolderPath = Path.Combine(host.WebRootPath, "uploads");
            var photo =  await photoService.uploadPhotoAsync(vehicle,file, uploadFolderPath);

            var photoResource = mapper.Map<Photo, PhotoResource>(photo);
            return Ok(photoResource);
        }

        [HttpGet]
        public async Task<IActionResult> GetPhotosAsync(int vehicleId)
        {
            var photos = await photoRepository.GetPhotosAsync(vehicleId);

            var photoResource = mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
            return Ok(photoResource);
        }
    }
}