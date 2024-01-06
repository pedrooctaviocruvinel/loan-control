using AutoMapper;
using LoanControl.Application.LoanContext.Queries;
using LoanControl.Domain.Entities;

namespace LoanControl.Application.Mappers;

public class LoanMapper : Profile
{
    public LoanMapper()
    {
        CreateMap<Loan, ListLoansQueryResult>()
            .ForMember(llqr => llqr.Id, mce => mce.MapFrom(l => l.Id))
            .ForMember(llqr => llqr.Name, mce => mce.MapFrom(l => l.Name))
            .ForMember(llqr => llqr.TotalFunded, mce => mce.MapFrom(l => l.TotalFunded))
            .ForMember(llqr => llqr.CreatedAt, mce => mce.MapFrom(l => l.CreatedAt));

        CreateMap<Loan, GetLoanByIdQueryResult>()
            .ForMember(llqr => llqr.Name, mce => mce.MapFrom(l => l.Name))
            .ForMember(llqr => llqr.TotalFunded, mce => mce.MapFrom(l => l.TotalFunded))
            .ForMember(llqr => llqr.CreatedAt, mce => mce.MapFrom(l => l.CreatedAt))
            .ForMember(llqr => llqr.UpdatedAt, mce => mce.MapFrom(l => l.UpdatedAt));

        CreateMap<Payment, GetLoanByIdPaymentDTO>()
            .ForMember(llqr => llqr.Id, mce => mce.MapFrom(l => l.Id))
            .ForMember(llqr => llqr.Value, mce => mce.MapFrom(l => l.Value))
            .ForMember(llqr => llqr.ExpirationDate, mce => mce.MapFrom(l => l.ExpirationDate))
            .ForMember(llqr => llqr.PaidDate, mce => mce.MapFrom(l => l.PaidDate));
    }
}
