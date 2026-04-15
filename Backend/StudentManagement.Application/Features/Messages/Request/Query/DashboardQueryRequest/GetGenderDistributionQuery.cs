using MediatR;
using StudentManagement.Domain.Common;
using StudentManagement.Domain.Models;

namespace StudentManagement.Application.Features.Messages.Request.Query.DashboardQueryRequest
{
    public class GetGenderDistributionQuery : IRequest<Result<GenderDistributionModel>>
    {
    }
}
