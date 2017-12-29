using Microsoft.EntityFrameworkCore;
using SaleIt.Models;

namespace SaleIt.Persistence
{
    public class SaleItDbContext : DbContext
    {
        public SaleItDbContext(DbContextOptions<SaleItDbContext> options)
        : base(options)
        {
        } 
        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }
    }
}