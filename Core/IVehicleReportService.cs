using System.Collections.Generic;
using System.Threading.Tasks;
using SaleIt.Core.Models;

namespace SaleIt.Core
{
    public interface IVehicleReportService
    {
        Task<IEnumerable<VehicleReport>> GetReportAsync();
    }

}