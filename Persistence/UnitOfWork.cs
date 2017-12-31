using System.Threading.Tasks;
using SaleIt.Core;

namespace SaleIt.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SaleItDbContext context;
        public UnitOfWork(SaleItDbContext context)
        {
            this.context = context;
        }

        public async Task CompleteAsync() =>
            await context.SaveChangesAsync();
    }
}