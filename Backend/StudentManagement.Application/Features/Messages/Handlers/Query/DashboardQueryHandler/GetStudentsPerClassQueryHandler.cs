using MediatR;
using StudentManagement.Application.Features.Messages.Request.Query.DashboardQueryRequest;
using StudentManagement.Domain.Common;
using StudentManagement.Domain.Interfaces;
using StudentManagement.Domain.Models;

namespace StudentManagement.Application.Features.Messages.Handlers.Query.DashboardQueryHandler
{
    public class GetStudentsPerClassQueryHandler : IRequestHandler<GetStudentsPerClassQuery, Result<List<StudentsPerClassModel>>>
    {
        private readonly IDashboardRepo _DashboardRepo;
        public GetStudentsPerClassQueryHandler(IDashboardRepo dashboardRepo)
        {
            _DashboardRepo = dashboardRepo;
        }
        public async Task<Result<List<StudentsPerClassModel>>> Handle(GetStudentsPerClassQuery request, CancellationToken cancellationToken)
        {
            return await _DashboardRepo.GetStudentsPerClass();
        }
    }
}
