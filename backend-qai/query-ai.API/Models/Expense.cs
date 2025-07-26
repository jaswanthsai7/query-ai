using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace query_ai.API.Models
{
    public class Expense
    {
        [Key]
        public int Id { get; set; }  // Auto-increment primary key

        [Required]
        [JsonPropertyName("expenseid")]
        public Guid ExpenseId { get; set; }  // GUID from UI

        [Required]
        [MaxLength(100)]
        [JsonPropertyName("category")]
        public string Category { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        [JsonPropertyName("amount")]
        public decimal Amount { get; set; }

        [Required]
        [Column(TypeName = "date")]
        [JsonPropertyName("entryDate")]
        public DateTime EntryDate { get; set; }

        [Required]
        [JsonPropertyName("createdAt")]
        public DateTime CreatedAt { get; set; }

        [MaxLength(50)]
        [JsonPropertyName("paymentMethod")]
        public string PaymentMethod { get; set; }

        [MaxLength(500)]
        [JsonPropertyName("notes")]
        public string Notes { get; set; }

        [Required]
        [MaxLength(100)]
        [JsonPropertyName("userId")]
        public string UserId { get; set; }
    }
}
