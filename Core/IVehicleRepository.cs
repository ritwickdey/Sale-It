using System.Collections.Generic;
using System.Threading.Tasks;
using SaleIt.Core.Models;

namespace SaleIt.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true);
        Task AddAsync(Vehicle vehicle);
        void Remove(Vehicle vehicle);
        Task<QueryResult<Vehicle>> GetVehiclesAsync(VehicleQuery queryObj);
    }
}