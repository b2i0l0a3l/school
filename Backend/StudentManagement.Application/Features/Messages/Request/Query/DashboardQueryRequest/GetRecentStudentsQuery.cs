using MediatR;
using StudentManagement.Domain.Common;
using StudentManagement.Domain.Models;

namespace StudentManagement.Application.Features.Messages.Request.Query.DashboardQueryRequest
{
    public class GetRecentStudentsQuery : IRequest<Result<List<RecentStudentModel>>>
    {
        public int Count { get; set; } = 5;
    }
}
