using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SaleIt.Models;

namespace SaleIt.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly SaleItDbContext context;
        public VehicleRepository(SaleItDbContext context)
        {
            this.context = context;
        }

        public async Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await context.Vehicles.FindAsync(id);

            return await context.Vehicles
                .Include(v => v.VehicleFeatures)
                .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                .ThenInclude(m => m.Make)
                .FirstOrDefaultAsync(v => v.Id == id);

        }

        public async Task AddAsync(Vehicle vehicle) =>
            await context.AddAsync(vehicle);
        public void Remove(Vehicle vehicle) =>
            context.Vehicles.Remove(vehicle);

    }
}