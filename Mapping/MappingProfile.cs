using AutoMapper;
using SaleIt.Controllers.Resources;
using SaleIt.Models;

namespace SaleIt.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResources>();
            CreateMap<Feature, FeatureResource>();
        }

    }
}