using System.Threading.Tasks;
using SaleIt.Models;

namespace SaleIt.Persistence
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicleAsync(int id);
    }
}