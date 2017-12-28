using Microsoft.EntityFrameworkCore;

namespace SaleIt.Persistence
{
    public class SaleItDbContext : DbContext
    {
        public SaleItDbContext(DbContextOptions<SaleItDbContext> options)
        : base(options)
        {

        }
    }
}