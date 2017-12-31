using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SaleIt.Core.Models
{
    [Table("Features")]
    public class Feature
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
        public ICollection<VehicleFeature> VehicleFeatures { get; set; }

        public Feature()
        {
            VehicleFeatures = new Collection<VehicleFeature>();
        }

    }
}