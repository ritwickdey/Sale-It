using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaleIt.Controllers.Resources;
using SaleIt.Core;
using SaleIt.Core.Models;
using SaleIt.Persistence;

namespace SaleIt.Controllers
{
    public class VehicleReportController : Controller
    {
        private readonly IVehicleReportService vehicleReportService;
        private readonly IMapper mapper;

        public VehicleReportController(
            IVehicleReportService vehicleReportService,
            IMapper mapper)
        {
            this.mapper = mapper;
            this.vehicleReportService = vehicleReportService;
        }

        [HttpGet("/api/VehicleReport")]
        public async Task<IActionResult> GetVehicleReportAsync()
        {
            var report = await vehicleReportService.GetReportAsync();
            var reportResource = mapper.Map<IEnumerable<VehicleReport>, IEnumerable<VehicleReportResource>>(report);
            return Ok(reportResource);
        }
    }
}