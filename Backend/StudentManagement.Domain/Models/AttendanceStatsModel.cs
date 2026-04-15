namespace StudentManagement.Domain.Models
{
    public class AttendanceStatsModel
    {
        public int TotalPresent { get; set; }
        public int TotalAbsent { get; set; }
        public int TotalLate { get; set; }
        public double AttendanceRate { get; set; }
    }
}
