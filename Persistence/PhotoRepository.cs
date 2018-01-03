using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SaleIt.Core;
using SaleIt.Core.Models;

namespace SaleIt.Persistence
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly SaleItDbContext context;
        public PhotoRepository(SaleItDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Photo>> GetPhotosAsync(int vehicleId)
        {
            return await context.Photos
                .Where(p => p.VehicleId == vehicleId)
                .ToListAsync();
        }
    }
}