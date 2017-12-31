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
    public class FeatureController : Controller
    {
        private readonly SaleItDbContext context;
        private readonly IMapper mapper;

        public FeatureController(SaleItDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("/api/features")]
        public async Task<IEnumerable<KeyValuePairResource>> getFeaturesAsync()
        {
            var features = await context.Features.ToListAsync();
            return mapper.Map<List<Feature>, List<KeyValuePairResource>>(features);
        }

    }
}