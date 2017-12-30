using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<IActionResult> CreateVehiclesAsync([FromBody] VehicleResource vehicleResource)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
                vehicle.LastUpdate = DateTime.Now;

                await context.Vehicles.AddAsync(vehicle);
                await context.SaveChangesAsync();

                var savedVehicleResource = mapper.Map<Vehicle, VehicleResource>(vehicle);
                return Ok(savedVehicleResource);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "Something Went Wrong" });
            }
        }
    }
}