namespace query_ai.API.DTOs
{
    public class UserSignUpDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class UserSignInDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }


}
