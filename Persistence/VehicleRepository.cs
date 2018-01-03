using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SaleIt.Core;
using SaleIt.Core.Models;
using SaleIt.Extensions;

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
                query = query.Where(v => v.Model.MakeId == queryObj.MakeId.Value);

            if (queryObj.ModelId.HasValue)
                query = query.Where(v => v.ModelId == queryObj.ModelId.Value);

            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>
            {
              ["make"] = v => v.Model.Make.name,   
              ["model"] = v => v.Model.Name,   
              ["contactname"] = v => v.ContactName,   
              ["id"] = v => v.Id   
            };

            query = query.ApplyOrdering(queryObj, columnsMap);

            query = query.ApplyPaging(queryObj);

            return await query.ToListAsync();
        }

        public async Task AddAsync(Vehicle vehicle) =>
            await context.AddAsync(vehicle);
        public void Remove(Vehicle vehicle) =>
            context.Vehicles.Remove(vehicle); 

    }
}