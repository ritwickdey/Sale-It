using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaleIt.Controllers.Resources;
using SaleIt.Models;
using SaleIt.Persistence;

namespace SaleIt.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper mapper;
        private readonly SaleItDbContext context;
        public VehiclesController(SaleItDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehiclesAsync([FromBody] SaveVehicleResource vehicleResource)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var vehicle = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
                vehicle.LastUpdate = DateTime.Now;

                await context.Vehicles.AddAsync(vehicle);
                await context.SaveChangesAsync();

                var savedVehicleResource = mapper.Map<Vehicle, SaveVehicleResource>(vehicle);
                return Ok(savedVehicleResource);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "Something Went Wrong" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehiclesAsync(int id, [FromBody] SaveVehicleResource vehicleResource)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var vehicle = await context.Vehicles.Include(e => e.VehicleFeatures).FirstOrDefaultAsync(e => e.Id == id);
                if (vehicle == null) return NotFound();

                mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
                vehicle.LastUpdate = DateTime.Now;

                await context.SaveChangesAsync();

                var result = mapper.Map<Vehicle, SaveVehicleResource>(vehicle);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "Something Went Wrong" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehiclesAsync(int id)
        {
            try
            {
                var vehicle = await context.Vehicles.FindAsync(id);
                if (vehicle == null) return NotFound();
                context.Vehicles.Remove(vehicle);
                await context.SaveChangesAsync();
                return Ok();
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
                var vehicle = await context.Vehicles
                    .Include(e => e.VehicleFeatures)
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (vehicle == null) return NotFound();

                var vehicleResource = mapper.Map<Vehicle, SaveVehicleResource>(vehicle);
                return Ok(vehicleResource);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "Something Went Wrong" });
            }
        }

    }
}