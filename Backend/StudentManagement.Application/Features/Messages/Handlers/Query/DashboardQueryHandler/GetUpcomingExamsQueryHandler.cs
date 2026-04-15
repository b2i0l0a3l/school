using MediatR;
using StudentManagement.Application.Features.Messages.Request.Query.DashboardQueryRequest;
using StudentManagement.Domain.Common;
using StudentManagement.Domain.Interfaces;
using StudentManagement.Domain.Models;

namespace StudentManagement.Application.Features.Messages.Handlers.Query.DashboardQueryHandler
{
    public class GetUpcomingExamsQueryHandler : IRequestHandler<GetUpcomingExamsQuery, Result<List<UpcomingExamModel>>>
    {
        private readonly IDashboardRepo _DashboardRepo;
        public GetUpcomingExamsQueryHandler(IDashboardRepo dashboardRepo)
        {
            _DashboardRepo = dashboardRepo;
        }
        public async Task<Result<List<UpcomingExamModel>>> Handle(GetUpcomingExamsQuery request, CancellationToken cancellationToken)
        {
            return await _DashboardRepo.GetUpcomingExams(request.Count);
        }
    }
}
