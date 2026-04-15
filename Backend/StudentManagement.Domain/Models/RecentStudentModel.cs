namespace StudentManagement.Domain.Models
{
    public class RecentStudentModel
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string ClassName { get; set; } = string.Empty;
        public DateTime EnrollmentDate { get; set; }
    }
}
