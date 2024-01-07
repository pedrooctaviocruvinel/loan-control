import { ListLoansLoanVO } from './valueObjects/list-loans-loan.vo';
import { ListLoansPaymentsStatusVO } from './valueObjects/list-loans-payments-status.vo';

export type ListLoansResultDTO = {
	loans: ListLoansLoanVO[];
	paymentsStatus: ListLoansPaymentsStatusVO;
};
