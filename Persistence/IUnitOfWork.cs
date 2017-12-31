using System.Threading.Tasks;

namespace SaleIt.Persistence
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}