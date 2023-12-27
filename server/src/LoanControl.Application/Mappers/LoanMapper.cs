using AutoMapper;
using LoanControl.Application.LoanContext.Queries;
using LoanControl.Domain.Entities;

namespace LoanControl.Application.Mappers;

public class LoanMapper : Profile
{
    public LoanMapper() =>
        CreateMap<Loan, ListLoansQueryResult>()
            .ForMember(llqr => llqr.Id, mce => mce.MapFrom(l => l.Id))
            .ForMember(llqr => llqr.Name, mce => mce.MapFrom(l => l.Name))
            .ForMember(llqr => llqr.TotalFunded, mce => mce.MapFrom(l => l.TotalFunded))
            .ForMember(llqr => llqr.CreatedAt, mce => mce.MapFrom(l => l.CreatedAt));
}
