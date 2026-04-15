namespace StudentManagement.Domain.Models
{
    public class TopStudentModel
    {
        public int StudentId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public double AverageScore { get; set; }
        public int ExamCount { get; set; }
    }
}
