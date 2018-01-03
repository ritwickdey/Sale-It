using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace SaleIt.Core.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public bool IsRegistered { get; set; }

        [Required]
        [StringLength(255)]
        public string ContactName { get; set; }

        [Required]
        [StringLength(255)]
        public string ContactPhone { get; set; }

        [StringLength(255)]
        public string ContactEmail { get; set; }

        public DateTime LastUpdate { get; set; }

        public int ModelId { get; set; }
        public Model Model { get; set; }

        public ICollection<VehicleFeature> VehicleFeatures { get; set; }
        public ICollection<Photo> Photos { get; set; }

        public Vehicle()
        {
            VehicleFeatures = new Collection<VehicleFeature>();
            Photos = new Collection<Photo>();
        }

    }
}