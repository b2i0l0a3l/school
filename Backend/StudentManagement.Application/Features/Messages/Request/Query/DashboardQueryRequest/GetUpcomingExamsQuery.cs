using MediatR;
using StudentManagement.Domain.Common;
using StudentManagement.Domain.Models;

namespace StudentManagement.Application.Features.Messages.Request.Query.DashboardQueryRequest
{
    public class GetUpcomingExamsQuery : IRequest<Result<List<UpcomingExamModel>>>
    {
        public int Count { get; set; } = 5;
    }
}
