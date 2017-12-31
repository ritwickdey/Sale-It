using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaleIt.Controllers.Resources;
using SaleIt.Core.Models;
using SaleIt.Persistence;

namespace SaleIt.Controllers
{
    public class MakesController : Controller
    {
        private readonly SaleItDbContext context;
        private readonly IMapper mapper;

        public MakesController(SaleItDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;

        }

        [HttpGet("/api/makes")]
        public async Task<IEnumerable<MakeResource>> GetMakesAsync()
        {
            var makes = await context.Makes
                .Include(m => m.Models)
                .ToListAsync();
                
            return Mapper.Map<List<Make>, List<MakeResource>>(makes);
        }

    }
}