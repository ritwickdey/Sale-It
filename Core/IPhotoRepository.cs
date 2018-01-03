using System.Collections.Generic;
using System.Threading.Tasks;
using SaleIt.Core.Models;

namespace SaleIt.Core
{
    public interface IPhotoRepository
    {
       Task<IEnumerable<Photo>> GetPhotosAsync(int vehicleId);

    }
}