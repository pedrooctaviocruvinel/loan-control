using AutoMapper;
using LoanControl.Application.BackupContext.Commands;
using LoanControl.Domain.Entities;

namespace LoanControl.Application.Mappers;

public class BackupMapper : Profile
{
    public BackupMapper()
    {
        CreateMap<List<Loan>, GenerateBackupCommandResult>()
            .ForMember(rbcr => rbcr.Loans, mce => mce.MapFrom(l => l));

        CreateMap<Loan, GenerateBackupLoanDTO>()
            .ForMember(rbl => rbl.Name, mce => mce.MapFrom(l => l.Name))
            .ForMember(rbl => rbl.TotalFunded, mce => mce.MapFrom(l => l.TotalFunded))
            .ForMember(rbl => rbl.Payments, mce => mce.MapFrom(l => l.Payments));

        CreateMap<Payment, GenerateBackupLoanPaymentDTO>()
            .ForMember(rblp => rblp.Value, mce => mce.MapFrom(p => p.Value))
            .ForMember(rblp => rblp.ExpirationDate, mce => mce.MapFrom(p => p.ExpirationDate))
            .ForMember(rblp => rblp.PaidDate, mce => mce.MapFrom(p => p.PaidDate));
    }
}
