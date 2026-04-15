using MediatR;
using StudentManagement.Application.Features.Messages.Request.Query.DashboardQueryRequest;
using StudentManagement.Domain.Common;
using StudentManagement.Domain.Interfaces;
using StudentManagement.Domain.Models;

namespace StudentManagement.Application.Features.Messages.Handlers.Query.DashboardQueryHandler
{
    public class GetTopStudentsQueryHandler : IRequestHandler<GetTopStudentsQuery, Result<List<TopStudentModel>>>
    {
        private readonly IDashboardRepo _DashboardRepo;
        public GetTopStudentsQueryHandler(IDashboardRepo dashboardRepo)
        {
            _DashboardRepo = dashboardRepo;
        }
        public async Task<Result<List<TopStudentModel>>> Handle(GetTopStudentsQuery request, CancellationToken cancellationToken)
        {
            return await _DashboardRepo.GetTopStudents(request.Count);
        }
    }
}
