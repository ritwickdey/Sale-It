using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace SaleIt.Models
{
    public class Make
    {
        public int Id { get; set; }
        public string name { get; set; }
        public ICollection<Model> Models { get; set; }

        public Make()
        {
            Models = new Collection<Model>();
        }
    }
}