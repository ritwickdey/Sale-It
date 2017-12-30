using System.Linq;
using AutoMapper;
using System.Collections.Generic;
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
            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone }))
                .ForMember(vr => vr.Features, opt =>  opt.MapFrom(v => v.VehicleFeatures.Select(e => e.FeatureId))); 

            CreateMap<VehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.VehicleFeatures, opt => opt.Ignore())
                .AfterMap((vr,v) => {
                    //add
                    foreach(var id in vr.Features) {
                        if(!v.VehicleFeatures.Any(e => e.FeatureId == id)) {
                            v.VehicleFeatures.Add(new VehicleFeature { FeatureId = id });   
                        }
                    }

                    //remove
                    var removedFeatures = new List<VehicleFeature>();
                    foreach(var f in v.VehicleFeatures) {
                        if(!vr.Features.Any(e => e == f.FeatureId)) {
                            removedFeatures.Add(f);
                        }
                    }

                    removedFeatures.ForEach(e => {
                        v.VehicleFeatures.Remove(e);
                    });

                });
        }

    }
}