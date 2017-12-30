using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace SaleIt.Controllers.Resources
{
    public class VehicleResource
    {
        public int Id { get; set; }
        public bool IsRegistered { get; set; }
        public DateTime LastUpdate { get; set; }
        public ContactResource Contact { get; set; }
        public ModelResources Model { get; set; }
        public MakeResource Make { get; set; }
        public ICollection<FeatureResource> Features { get; set; }

        public VehicleResource()
        {
            Features = new Collection<FeatureResource>();
        }

    }
}