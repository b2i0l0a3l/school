using MediatR;
using StudentManagement.Application.Features.Messages.Request.Query.DashboardQueryRequest;
using StudentManagement.Domain.Common;
using StudentManagement.Domain.Interfaces;
using StudentManagement.Domain.Models;

namespace StudentManagement.Application.Features.Messages.Handlers.Query.DashboardQueryHandler
{
    public class GetRecentStudentsQueryHandler : IRequestHandler<GetRecentStudentsQuery, Result<List<RecentStudentModel>>>
    {
        private readonly IDashboardRepo _DashboardRepo;
        public GetRecentStudentsQueryHandler(IDashboardRepo dashboardRepo)
        {
            _DashboardRepo = dashboardRepo;
        }
        public async Task<Result<List<RecentStudentModel>>> Handle(GetRecentStudentsQuery request, CancellationToken cancellationToken)
        {
            return await _DashboardRepo.GetRecentStudents(request.Count);
        }
    }
}
