using System.Threading.Tasks;

namespace SaleIt.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}