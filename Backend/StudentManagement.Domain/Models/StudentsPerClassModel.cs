namespace StudentManagement.Domain.Models
{
    public class StudentsPerClassModel
    {
        public int ClassId { get; set; }
        public string ClassName { get; set; } = string.Empty;
        public int StudentCount { get; set; }
    }
}
