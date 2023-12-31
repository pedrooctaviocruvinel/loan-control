﻿using AutoMapper;
using LoanControl.Application.BackupContext.Commands;
using LoanControl.CrossCutting.Core.Models;
using LoanControl.Domain.Entities;
using LoanControl.Domain.Services;
using MediatR;

namespace LoanControl.Application.BackupContext;

public class BackupHandlers(BackupService backupService, IMapper mapper) :
    IRequestHandler<GenerateBackupCommandRequest, ResultWrapper<GenerateBackupCommandResult>>,
    IRequestHandler<ExecuteBackupCommandRequest, ResultWrapper>
{
    private readonly BackupService _backupService = backupService;
    private readonly IMapper _mapper = mapper;

    public async Task<ResultWrapper<GenerateBackupCommandResult>> Handle(GenerateBackupCommandRequest commandRequest, CancellationToken cancellationToken)
    {
        var generateBackupResult = await _backupService.Generate();

        if (!generateBackupResult.Success)
            return new ResultWrapper<GenerateBackupCommandResult>(generateBackupResult.ErrorCode, (List<string>)generateBackupResult.Errors);

        var mappedBackup = _mapper.Map<GenerateBackupCommandResult>(generateBackupResult.Data);

        return new ResultWrapper<GenerateBackupCommandResult>(mappedBackup);
    }

    public async Task<ResultWrapper> Handle(ExecuteBackupCommandRequest commandRequest, CancellationToken cancellationToken)
    {
        var loans = _mapper.Map<List<Loan>>(commandRequest.Loans);

        return await _backupService.Execute(loans);
    }
}
