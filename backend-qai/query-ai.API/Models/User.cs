using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace query_ai.API.Models
{
        [Table("users")]
        public class User
        {
            [Key]
            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public int Id { get; set; }

            [Required, MaxLength(100)]
            public string Name { get; set; }

            [Required, MaxLength(150)]
            public string Email { get; set; }

            [Required]
            public string PasswordHash { get; set; }  // Store hashed password

            [Required, MaxLength(10)]
            public string QueryId { get; set; }  // Unique 10-character ID

            public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        }


}
