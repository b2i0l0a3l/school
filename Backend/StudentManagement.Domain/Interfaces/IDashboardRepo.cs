using StudentManagement.Domain.Common;
using StudentManagement.Domain.Models;

namespace StudentManagement.Domain.Interfaces
{
    public interface IDashboardRepo 
    {
        Task<Result<DashboardSummaryModel>> GetSummary();
        Task<Result<List<RecentStudentModel>>> GetRecentStudents(int count = 5);
        Task<Result<AttendanceStatsModel>> GetAttendanceStats();
        Task<Result<List<UpcomingExamModel>>> GetUpcomingExams(int count = 5);
        Task<Result<GenderDistributionModel>> GetGenderDistribution();
        Task<Result<List<StudentsPerClassModel>>> GetStudentsPerClass();
        Task<Result<List<TopStudentModel>>> GetTopStudents(int count = 10);
    }
}