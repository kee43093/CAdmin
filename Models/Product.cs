using System;
namespace CSharpAdmin.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Product_Name { get; set; }
        public int Category_ID { get; set; }
        public string About { get; set; }
        public string Category { get; set; }
        public string Images { get; set; }
    }
}
