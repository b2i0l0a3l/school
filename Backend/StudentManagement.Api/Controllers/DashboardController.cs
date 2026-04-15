using MediatR;
using Microsoft.AspNetCore.Mvc;
using StudentManagement.Application.Features.Messages.Request.Query.DashboardQueryRequest;

namespace StudentManagement.Api.Controllers
{
    [ApiController]
    [Route("api/Dashboard")]
    public class DashboardController : ApiControllerBase
    {
        private readonly IMediator _Mediator;
        public DashboardController(IMediator mediator) => _Mediator = mediator;

        [HttpGet("Summary")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetSummary()
        {
            var result = await _Mediator.Send(new GetDashboardSummaryQuery());
            return ReturnResult(result);
        }

        [HttpGet("RecentStudents")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetRecentStudents([FromQuery] int count = 5)
        {
            var result = await _Mediator.Send(new GetRecentStudentsQuery { Count = count });
            return ReturnResult(result);
        }

        [HttpGet("AttendanceStats")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAttendanceStats()
        {
            var result = await _Mediator.Send(new GetAttendanceStatsQuery());
            return ReturnResult(result);
        }

        [HttpGet("UpcomingExams")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetUpcomingExams([FromQuery] int count = 5)
        {
            var result = await _Mediator.Send(new GetUpcomingExamsQuery { Count = count });
            return ReturnResult(result);
        }

        [HttpGet("GenderDistribution")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetGenderDistribution()
        {
            var result = await _Mediator.Send(new GetGenderDistributionQuery());
            return ReturnResult(result);
        }

        [HttpGet("StudentsPerClass")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetStudentsPerClass()
        {
            var result = await _Mediator.Send(new GetStudentsPerClassQuery());
            return ReturnResult(result);
        }

        [HttpGet("TopStudents")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetTopStudents([FromQuery] int count = 10)
        {
            var result = await _Mediator.Send(new GetTopStudentsQuery { Count = count });
            return ReturnResult(result);
        }
    }
}
