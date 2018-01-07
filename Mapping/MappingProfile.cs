using System.Linq;
using AutoMapper;
using SaleIt.Controllers.Resources;
using SaleIt.Core.Models;

namespace SaleIt.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Domain Model to API Resource
            CreateMap<VehicleReport, VehicleReportResource>();
            CreateMap<Photo, PhotoResource>();
            CreateMap(typeof(QueryResult<>), typeof(QueryResultResource<>));
            CreateMap<Make, MakeResource>();
            CreateMap<Model, KeyValuePairResource>();
            CreateMap<Feature, KeyValuePairResource>();
            CreateMap<Vehicle, SaveVehicleResource>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.VehicleFeatures.Select(e => e.FeatureId)));
            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone }))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.VehicleFeatures.Select(e => new KeyValuePairResource { Id = e.FeatureId, Name = e.Feature.Name })))
                .ForMember(vr => vr.Make, opt => opt.MapFrom(v => v.Model.Make));


            //API Resource to Domain Model
            CreateMap<VehicleQueryResource, VehicleQuery>();
            CreateMap<SaveVehicleResource, Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.VehicleFeatures, opt => opt.Ignore())
                .AfterMap((vr, v) =>
                {
                    //add
                    var addedFeature = vr.Features.Where(id => !v.VehicleFeatures.Any(e => e.FeatureId == id));
                    foreach (var id in addedFeature)
                    {
                        v.VehicleFeatures.Add(new VehicleFeature { FeatureId = id });
                    }

                    //remove
                    var removedFeatures = v.VehicleFeatures.Where(f => !vr.Features.Any(e => e == f.FeatureId));
                    foreach (var f in removedFeatures.ToList())
                    {
                        v.VehicleFeatures.Remove(f);
                    }

                });
        }

    }
}