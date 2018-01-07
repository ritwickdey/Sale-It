using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using SaleIt.Core.Models;

namespace SaleIt.Core
{
    public interface IPhotoService
    {
        Task<Photo> uploadPhotoAsync(Vehicle vehicle, IFormFile file, string uploadFolderPath);
    }
}