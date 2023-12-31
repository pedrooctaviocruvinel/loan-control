﻿using LoanControl.CrossCutting.Core.Enums;

namespace LoanControl.CrossCutting.Core.Models;

public class ResultWrapper<TEntity> where TEntity : class
{
    public ResultWrapper(TEntity data)
    {
        ErrorCode = EErrorCode.NoError;
        Data = data;
    }

    public ResultWrapper(EErrorCode errorCode) =>
        ErrorCode = errorCode;

    public ResultWrapper(EErrorCode errorCode, List<string> errors)
    {
        ErrorCode = errorCode;
        Errors = errors;
    }

    public bool Success { get => ErrorCode == EErrorCode.NoError; }
    public EErrorCode ErrorCode { get; private set; }
    public IEnumerable<string> Errors { get; private set; }
    public TEntity Data { get; private set; }
}

public class ResultWrapper
{
    public ResultWrapper() =>
        ErrorCode = EErrorCode.NoError;

    public ResultWrapper(EErrorCode errorCode) =>
        ErrorCode = errorCode;

    public ResultWrapper(EErrorCode errorCode, List<string> errors)
    {
        ErrorCode = errorCode;
        Errors = errors;
    }

    public bool Success { get => ErrorCode == EErrorCode.NoError; }
    public EErrorCode ErrorCode { get; private set; }
    public IEnumerable<string> Errors { get; private set; }
}
