using MediatR;
using StudentManagement.Application.Features.Messages.Request.Query.DashboardQueryRequest;
using StudentManagement.Domain.Common;
using StudentManagement.Domain.Interfaces;
using StudentManagement.Domain.Models;

namespace StudentManagement.Application.Features.Messages.Handlers.Query.DashboardQueryHandler
{
    public class GetAttendanceStatsQueryHandler : IRequestHandler<GetAttendanceStatsQuery, Result<AttendanceStatsModel>>
    {
        private readonly IDashboardRepo _DashboardRepo;
        public GetAttendanceStatsQueryHandler(IDashboardRepo dashboardRepo)
        {
            _DashboardRepo = dashboardRepo;
        }
        public async Task<Result<AttendanceStatsModel>> Handle(GetAttendanceStatsQuery request, CancellationToken cancellationToken)
        {
            return await _DashboardRepo.GetAttendanceStats();
        }
    }
}
