using System.Linq;

namespace SaleIt.Core.Models
{
    public class PhotoSettings
    {
        public int MaxBytes { get; set; }
        public string[] SupportedFilesType { get; set; }

        public bool IsSupported(string fileName) =>
            SupportedFilesType.Any(s => s?.ToLower() == fileName?.ToLower());
    }
    
    
}