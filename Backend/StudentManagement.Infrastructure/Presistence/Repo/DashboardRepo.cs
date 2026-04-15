using System.Data;
using Dapper;
using Microsoft.EntityFrameworkCore;
using StudentManagement.Domain.Common;
using StudentManagement.Domain.Interfaces;
using StudentManagement.Domain.Models;

namespace StudentManagement.Infrastructure.Presistence.Repo
{
    public class DashboardRepo : IDashboardRepo
    {
        private readonly AppDbContext _Context;
        public DashboardRepo(AppDbContext context)
        {
            _Context = context;
        }

        private async Task<IDbConnection> GetOpenConnectionAsync()
        {
            var connection = _Context.Database.GetDbConnection();
            if (connection.State != ConnectionState.Open)
                await connection.OpenAsync();
            return connection;
        }

        public async Task<Result<DashboardSummaryModel>> GetSummary()
        {
            try
            {
                var connection = await GetOpenConnectionAsync();
                string sql = @"
                    SELECT 
                        (SELECT COUNT(*) FROM ""Students"") AS TotalStudents,
                        (SELECT COUNT(*) FROM ""Teachers"") AS TotalTeachers,
                        (SELECT COUNT(*) FROM ""Courses"") AS TotalCourses,
                        (SELECT COUNT(*) FROM ""Departments"") AS TotalDepartments
                ";
                var total = await connection.QueryFirstOrDefaultAsync<DashboardSummaryModel>(sql);
                if (total == null)
                    return new Error("GetSummaryERROR", ErrorType.NotFound, "No Data Found For Dashboard Summary.");
                return total;
            }
            catch
            {
                return new Error("GetSummaryERROR", ErrorType.Failure, "Error Happend By Fetching Dashboard Summary Data.");
            }
        }

        public async Task<Result<List<RecentStudentModel>>> GetRecentStudents(int count = 5)
        {
            try
            {
                var connection = await GetOpenConnectionAsync();
                string sql = @"
                    SELECT s.""Id"", s.""FullName"", c.""ClassName"", s.""EnrollmentDate""
                    FROM ""Students"" s
                    LEFT JOIN ""Classes"" c ON s.""ClassId"" = c.""Id""
                    ORDER BY s.""EnrollmentDate"" DESC
                    LIMIT @Count
                ";
                var students = (await connection.QueryAsync<RecentStudentModel>(sql, new { Count = count })).ToList();
                if (students == null || students.Count == 0)
                    return new Error("GetRecentStudentsERROR", ErrorType.NotFound, "No recent students found.");
                return students;
            }
            catch
            {
                return new Error("GetRecentStudentsERROR", ErrorType.Failure, "Error fetching recent students.");
            }
        }

        public async Task<Result<AttendanceStatsModel>> GetAttendanceStats()
        {
            try
            {
                var connection = await GetOpenConnectionAsync();
                string sql = @"
                    SELECT 
                        COUNT(*) FILTER (WHERE ""Status"" = 1) AS TotalPresent,
                        COUNT(*) FILTER (WHERE ""Status"" = 2) AS TotalAbsent,
                        COUNT(*) FILTER (WHERE ""Status"" = 3) AS TotalLate,
                        CASE 
                            WHEN COUNT(*) > 0 
                            THEN ROUND(COUNT(*) FILTER (WHERE ""Status"" = 1) * 100.0 / COUNT(*), 2)
                            ELSE 0 
                        END AS AttendanceRate
                    FROM ""Attendances""
                ";
                var stats = await connection.QueryFirstOrDefaultAsync<AttendanceStatsModel>(sql);
                if (stats == null)
                    return new Error("GetAttendanceStatsERROR", ErrorType.NotFound, "No attendance data found.");
                return stats;
            }
            catch
            {
                return new Error("GetAttendanceStatsERROR", ErrorType.Failure, "Error fetching attendance stats.");
            }
        }

        public async Task<Result<List<UpcomingExamModel>>> GetUpcomingExams(int count = 5)
        {
            try
            {
                var connection = await GetOpenConnectionAsync();
                string sql = @"
                    SELECT e.""Id"", e.""Title"", sub.""SubjectName"", e.""Date"", e.""MaxScore""
                    FROM ""Exams"" e
                    LEFT JOIN ""Subjects"" sub ON e.""SubjectId"" = sub.""Id""
                    WHERE e.""Date"" >= NOW()
                    ORDER BY e.""Date"" ASC
                    LIMIT @Count
                ";
                var exams = (await connection.QueryAsync<UpcomingExamModel>(sql, new { Count = count })).ToList();
                if (exams == null || exams.Count == 0)
                    return new Error("GetUpcomingExamsERROR", ErrorType.NotFound, "No upcoming exams found.");
                return exams;
            }
            catch
            {
                return new Error("GetUpcomingExamsERROR", ErrorType.Failure, "Error fetching upcoming exams.");
            }
        }

        public async Task<Result<GenderDistributionModel>> GetGenderDistribution()
        {
            try
            {
                var connection = await GetOpenConnectionAsync();
                string sql = @"
                    SELECT 
                        COUNT(*) FILTER (WHERE ""Gender"" = 0) AS MaleCount,
                        COUNT(*) FILTER (WHERE ""Gender"" = 1) AS FemaleCount
                    FROM ""Students""
                ";
                var distribution = await connection.QueryFirstOrDefaultAsync<GenderDistributionModel>(sql);
                if (distribution == null)
                    return new Error("GetGenderDistributionERROR", ErrorType.NotFound, "No gender data found.");
                return distribution;
            }
            catch
            {
                return new Error("GetGenderDistributionERROR", ErrorType.Failure, "Error fetching gender distribution.");
            }
        }

        public async Task<Result<List<StudentsPerClassModel>>> GetStudentsPerClass()
        {
            try
            {
                var connection = await GetOpenConnectionAsync();
                string sql = @"
                    SELECT c.""Id"" AS ClassId, c.""ClassName"", COUNT(s.""Id"") AS StudentCount
                    FROM ""Classes"" c
                    LEFT JOIN ""Students"" s ON s.""ClassId"" = c.""Id""
                    GROUP BY c.""Id"", c.""ClassName""
                    ORDER BY StudentCount DESC
                ";
                var result = (await connection.QueryAsync<StudentsPerClassModel>(sql)).ToList();
                if (result == null || result.Count == 0)
                    return new Error("GetStudentsPerClassERROR", ErrorType.NotFound, "No class data found.");
                return result;
            }
            catch
            {
                return new Error("GetStudentsPerClassERROR", ErrorType.Failure, "Error fetching students per class.");
            }
        }

        public async Task<Result<List<TopStudentModel>>> GetTopStudents(int count = 10)
        {
            try
            {
                var connection = await GetOpenConnectionAsync();
                string sql = @"
                    SELECT g.""StudentId"", s.""FullName"", 
                           ROUND(AVG(g.""Score"")::numeric, 2) AS AverageScore,
                           COUNT(g.""Id"") AS ExamCount
                    FROM ""Grades"" g
                    INNER JOIN ""Students"" s ON g.""StudentId"" = s.""Id""
                    GROUP BY g.""StudentId"", s.""FullName""
                    ORDER BY AverageScore DESC
                    LIMIT @Count
                ";
                var students = (await connection.QueryAsync<TopStudentModel>(sql, new { Count = count })).ToList();
                if (students == null || students.Count == 0)
                    return new Error("GetTopStudentsERROR", ErrorType.NotFound, "No grade data found.");
                return students;
            }
            catch
            {
                return new Error("GetTopStudentsERROR", ErrorType.Failure, "Error fetching top students.");
            }
        }
    }
}