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
            .ForMember(rbl => rbl.Id, mce => mce.MapFrom(l => l.Id))
            .ForMember(rbl => rbl.CreatedAt, mce => mce.MapFrom(l => l.CreatedAt))
            .ForMember(rbl => rbl.UpdatedAt, mce => mce.MapFrom(l => l.UpdatedAt))
            .ForMember(rbl => rbl.Name, mce => mce.MapFrom(l => l.Name))
            .ForMember(rbl => rbl.TotalFunded, mce => mce.MapFrom(l => l.TotalFunded))
            .ForMember(rbl => rbl.Payments, mce => mce.MapFrom(l => l.Payments));

        CreateMap<Payment, GenerateBackupLoanPaymentDTO>()
            .ForMember(rblp => rblp.Id, mce => mce.MapFrom(p => p.Id))
            .ForMember(rblp => rblp.CreatedAt, mce => mce.MapFrom(p => p.CreatedAt))
            .ForMember(rblp => rblp.UpdatedAt, mce => mce.MapFrom(p => p.UpdatedAt))
            .ForMember(rblp => rblp.Value, mce => mce.MapFrom(p => p.Value))
            .ForMember(rblp => rblp.ExpirationDate, mce => mce.MapFrom(p => p.ExpirationDate))
            .ForMember(rblp => rblp.PaidDate, mce => mce.MapFrom(p => p.PaidDate));

        CreateMap<ExecuteBackupLoanDTO, Loan>()
            .ForMember(l => l.Id, mce => mce.MapFrom(ebl => ebl.Id))
            .ForMember(l => l.CreatedAt, mce => mce.MapFrom(ebl => ebl.CreatedAt))
            .ForMember(l => l.UpdatedAt, mce => mce.MapFrom(ebl => ebl.UpdatedAt))
            .ForMember(l => l.Name, mce => mce.MapFrom(ebl => ebl.Name))
            .ForMember(l => l.TotalFunded, mce => mce.MapFrom(ebl => ebl.TotalFunded))
            .ForMember(l => l.Payments, mce => mce.MapFrom(ebl => ebl.Payments));

        CreateMap<ExecuteBackupLoanPaymentDTO, Payment>()
            .ForMember(p => p.Id, mce => mce.MapFrom(eblp => eblp.Id))
            .ForMember(p => p.CreatedAt, mce => mce.MapFrom(eblp => eblp.CreatedAt))
            .ForMember(p => p.UpdatedAt, mce => mce.MapFrom(eblp => eblp.UpdatedAt))
            .ForMember(p => p.Value, mce => mce.MapFrom(eblp => eblp.Value))
            .ForMember(p => p.ExpirationDate, mce => mce.MapFrom(eblp => eblp.ExpirationDate))
            .ForMember(p => p.PaidDate, mce => mce.MapFrom(eblp => eblp.PaidDate));
    }
}
