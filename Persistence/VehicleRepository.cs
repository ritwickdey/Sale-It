using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SaleIt.Core;
using SaleIt.Core.Models;

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

        public async Task<IEnumerable<Vehicle>> GetVehiclesAsync(VehicleQuery queryObj)
        {
            var query = context.Vehicles
                .Include(v => v.Model)
                .ThenInclude(m => m.Make)
                .AsQueryable();

            if (queryObj.MakeId.HasValue)
            {
                query = query.Where(v => v.Model.MakeId == queryObj.MakeId.Value);
            }

            if (queryObj.ModelId.HasValue)
            {
                query = query.Where(v => v.ModelId == queryObj.ModelId.Value);
            }

            if (queryObj.SortBy?.ToLower() == "make")
                query = queryObj.IsSortAscending ?
                     query.OrderBy(v => v.Model.Make.name) : query.OrderByDescending(v => v.Model.Make.name);

            if (queryObj.SortBy?.ToLower() == "model")
                query = queryObj.IsSortAscending ?
                query.OrderBy(v => v.Model.Name) : query.OrderByDescending(v => v.Model.Name);

            if (queryObj.SortBy?.ToLower() == "contactname")
                query = queryObj.IsSortAscending ?
                query.OrderBy(v => v.ContactName) : query.OrderByDescending(v => v.ContactName);

            if (queryObj.SortBy?.ToLower() == "id")
                query = queryObj.IsSortAscending ?
                query.OrderBy(v => v.Id) : query.OrderByDescending(v => v.Id);

            return await query.ToListAsync();

        }

        public async Task AddAsync(Vehicle vehicle) =>
            await context.AddAsync(vehicle);
        public void Remove(Vehicle vehicle) =>
            context.Vehicles.Remove(vehicle);

    }
}