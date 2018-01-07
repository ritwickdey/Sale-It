using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SaleIt.Core;
using SaleIt.Core.Models;
using SaleIt.Persistence;

namespace SaleIt.Persistence
{
    public class VehicleReportService : IVehicleReportService
    {
        private readonly SaleItDbContext context;
        public VehicleReportService(SaleItDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<VehicleReport>> GetReportAsync()
        {
            var report = (await context.Makes
                    .GroupJoin(context.Models.Select(e => new { e.MakeId, e.Id }), ma => ma.Id, mo => mo.MakeId, (make, models) => new
                    {
                        MakeName = make.name,
                            TotalVehicles = models
                            .GroupJoin(context.Vehicles.Select(e => new { e.Id, e.ModelId }), m => m.Id, v => v.ModelId, (m, v) => new
                            {
                                VehiclesCount = v.Count()
                            })
                            .Select(e => e.VehiclesCount)
                    })
                    .ToListAsync())
                .Select(e => new VehicleReport
                {
                    MakeName = e.MakeName,
                        TotalVehicles = e.TotalVehicles.Aggregate(0, (old, x) => x + old)
                });
            return report;
        }
    }

}