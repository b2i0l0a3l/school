using MediatR;
using StudentManagement.Domain.Common;
using StudentManagement.Domain.Models;

namespace StudentManagement.Application.Features.Messages.Request.Query.DashboardQueryRequest
{
    public class GetTopStudentsQuery : IRequest<Result<List<TopStudentModel>>>
    {
        public int Count { get; set; } = 10;
    }
}
