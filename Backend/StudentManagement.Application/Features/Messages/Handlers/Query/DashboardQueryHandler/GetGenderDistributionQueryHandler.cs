using MediatR;
using StudentManagement.Application.Features.Messages.Request.Query.DashboardQueryRequest;
using StudentManagement.Domain.Common;
using StudentManagement.Domain.Interfaces;
using StudentManagement.Domain.Models;

namespace StudentManagement.Application.Features.Messages.Handlers.Query.DashboardQueryHandler
{
    public class GetGenderDistributionQueryHandler : IRequestHandler<GetGenderDistributionQuery, Result<GenderDistributionModel>>
    {
        private readonly IDashboardRepo _DashboardRepo;
        public GetGenderDistributionQueryHandler(IDashboardRepo dashboardRepo)
        {
            _DashboardRepo = dashboardRepo;
        }
        public async Task<Result<GenderDistributionModel>> Handle(GetGenderDistributionQuery request, CancellationToken cancellationToken)
        {
            return await _DashboardRepo.GetGenderDistribution();
        }
    }
}
