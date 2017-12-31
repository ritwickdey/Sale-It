using System.Threading.Tasks;
using SaleIt.Models;

namespace SaleIt.Persistence
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true);
        Task AddAsync(Vehicle vehicle);
        void Remove(Vehicle vehicle);
    }
}