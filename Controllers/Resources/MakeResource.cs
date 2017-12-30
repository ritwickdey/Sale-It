using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace SaleIt.Controllers.Resources
{
    public class MakeResource : KeyValuePairResources
    {
        public ICollection<KeyValuePairResources> Models { get; set; }
        public MakeResource()
        {
            Models = new Collection<KeyValuePairResources>();
        }
    }
}