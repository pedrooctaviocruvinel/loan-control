using AutoMapper;
using LoanControl.Application.LoanContext.Queries;
using LoanControl.Application.LoanContext.Queries.DTOs;
using LoanControl.Domain.DTOs;
using LoanControl.Domain.DTOs.ValueObjects;
using LoanControl.Domain.Entities;
using LoanControl.Domain.Entities.ValueObjects;

namespace LoanControl.Application.Mappers;

public class LoanMapper : Profile
{
    public LoanMapper()
    {
        CreateMap<LoansPaymentsStatusDTO, ListLoansQueryResult>()
            .ForMember(llqr => llqr.Loans, mce => mce.MapFrom(l => l.Loans))
            .ForMember(llqr => llqr.PaymentsStatus, mce => mce.MapFrom(l => l.PaymentsStatus));

        CreateMap<Loan, ListLoansLoanDTO>()
            .ForMember(llqr => llqr.Id, mce => mce.MapFrom(l => l.Id))
            .ForMember(llqr => llqr.Name, mce => mce.MapFrom(l => l.Name))
            .ForMember(llqr => llqr.TotalFunded, mce => mce.MapFrom(l => l.TotalFunded))
            .ForMember(llqr => llqr.CreatedAt, mce => mce.MapFrom(l => l.CreatedAt));

        CreateMap<LoansPaymentsStatusVO, ListLoansPaymentsStatusDTO>()
            .ForMember(llqr => llqr.TotalFunded, mce => mce.MapFrom(l => l.TotalFunded))
            .ForMember(llqr => llqr.TotalToBeReceived, mce => mce.MapFrom(l => l.TotalToBeReceived))
            .ForMember(llqr => llqr.TotalReceived, mce => mce.MapFrom(l => l.TotalReceived))
            .ForMember(llqr => llqr.ExpectedProfit, mce => mce.MapFrom(l => l.ExpectedProfit))
            .ForMember(llqr => llqr.Profit, mce => mce.MapFrom(l => l.Profit));

        CreateMap<Loan, GetLoanByIdQueryResult>()
            .ForMember(llqr => llqr.Name, mce => mce.MapFrom(l => l.Name))
            .ForMember(llqr => llqr.TotalFunded, mce => mce.MapFrom(l => l.TotalFunded))
            .ForMember(llqr => llqr.CreatedAt, mce => mce.MapFrom(l => l.CreatedAt))
            .ForMember(llqr => llqr.UpdatedAt, mce => mce.MapFrom(l => l.UpdatedAt))
            .ForMember(llqr => llqr.Payments, mce => mce.MapFrom(l => l.Payments))
            .ForMember(llqr => llqr.PaymentsStatus, mce => mce.MapFrom(l => l.PaymentsStatus));

        CreateMap<Payment, GetLoanByIdPaymentDTO>()
            .ForMember(llqr => llqr.Id, mce => mce.MapFrom(l => l.Id))
            .ForMember(llqr => llqr.Value, mce => mce.MapFrom(l => l.Value))
            .ForMember(llqr => llqr.ExpirationDate, mce => mce.MapFrom(l => l.ExpirationDate))
            .ForMember(llqr => llqr.PaidDate, mce => mce.MapFrom(l => l.PaidDate))
            .ForMember(llqr => llqr.Paid, mce => mce.MapFrom(l => l.Paid));

        CreateMap<LoanPaymentsStatusVO, GetLoanByIdPaymentsStatusDTO>()
            .ForMember(glbilps => glbilps.PaymentsCount, mce => mce.MapFrom(lps => lps.PaymentsCount))
            .ForMember(glbilps => glbilps.PaymentsPaid, mce => mce.MapFrom(lps => lps.PaymentsPaid))
            .ForMember(glbilps => glbilps.RemainingPayments, mce => mce.MapFrom(lps => lps.RemainingPayments))
            .ForMember(glbilps => glbilps.NextPaymentDate, mce => mce.MapFrom(lps => lps.NextPaymentDate))
            .ForMember(glbilps => glbilps.TotalToBeReceived, mce => mce.MapFrom(lps => lps.TotalToBeReceived))
            .ForMember(glbilps => glbilps.TotalReceived, mce => mce.MapFrom(lps => lps.TotalReceived))
            .ForMember(glbilps => glbilps.ExpectedProfit, mce => mce.MapFrom(lps => lps.ExpectedProfit))
            .ForMember(glbilps => glbilps.Profit, mce => mce.MapFrom(lps => lps.Profit));
    }
}
