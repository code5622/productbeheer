using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Store.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        [Column("productname")]
        public string ProductName { get; set; }
        [Column("amount")]
        public int Amount { get; set; }
    }
}
