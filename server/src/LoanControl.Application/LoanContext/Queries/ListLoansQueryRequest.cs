using LoanControl.CrossCutting.Core.Models;
using MediatR;

namespace LoanControl.Application.LoanContext.Queries;

public class ListLoansQueryRequest : IRequest<ResultWrapper<List<ListLoansQueryResult>>> { }
