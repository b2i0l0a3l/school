namespace StudentManagement.Domain.Models
{
    public class UpcomingExamModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string SubjectName { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public float MaxScore { get; set; }
    }
}
