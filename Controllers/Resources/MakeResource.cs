using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace SaleIt.Controllers.Resources
{
    public class MakeResource
    {
        
        public int Id { get; set; }
        
        public string name { get; set; }
        public ICollection<ModelResources> Models { get; set; }
        public MakeResource()
        {
            Models = new Collection<ModelResources>();
        }
    }
}