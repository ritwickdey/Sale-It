using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SaleIt.Controllers.Resources;
using SaleIt.Controllers.Resources.Policy;
using SaleIt.Core;
using SaleIt.Core.Models;

namespace SaleIt.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        public VehiclesController(IMapper mapper, IVehicleRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }

        [HttpPost]
        [Authorize(Policies.RequriedModeratorRole)]
        public async Task<IActionResult> CreateVehiclesAsync([FromBody] SaveVehicleResource vehicleResource)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var vehicle = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
                vehicle.LastUpdate = DateTime.Now;

                await repository.AddAsync(vehicle);
                await unitOfWork.CompleteAsync();

                vehicle = await repository.GetVehicleAsync(vehicle.Id);

                var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "Something Went Wrong" });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Policies.RequriedModeratorRole)]
        public async Task<IActionResult> UpdateVehiclesAsync(int id, [FromBody] SaveVehicleResource vehicleResource)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                // var vehicle = await context.Vehicles.Include(e => e.VehicleFeatures).FirstOrDefaultAsync(e => e.Id == id);
                var vehicle = await repository.GetVehicleAsync(id);

                if (vehicle == null) return NotFound();

                mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
                vehicle.LastUpdate = DateTime.Now;

                await unitOfWork.CompleteAsync();

                vehicle = await repository.GetVehicleAsync(vehicle.Id);
                var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Something Went Wrong", ex });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Policies.RequriedModeratorRole)]
        public async Task<IActionResult> DeleteVehiclesAsync(int id)
        {
            try
            {
                var vehicle = await repository.GetVehicleAsync(id, includeRelated: false);
                if (vehicle == null) return NotFound();
                repository.Remove(vehicle);
                await unitOfWork.CompleteAsync();
                return Ok(new { });
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "Something Went Wrong" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehiclesAsync(int id)
        {
            try
            {
                var vehicle = await repository.GetVehicleAsync(id);

                if (vehicle == null) return NotFound();

                var vehicleResource = mapper.Map<Vehicle, VehicleResource>(vehicle);
                return Ok(vehicleResource);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "Something Went Wrong" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetVehiclesAsync(VehicleQueryResource filterResource)
        {
            try
            {
                var filter = mapper.Map<VehicleQueryResource, VehicleQuery>(filterResource);
                var queryResult = await repository.GetVehiclesAsync(filter);
                var vehiclesResource = mapper.Map<QueryResult<Vehicle>, QueryResultResource<VehicleResource>>(queryResult);
                return Ok(vehiclesResource);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "Something Went Wrong" });
            }
        }

    }
}