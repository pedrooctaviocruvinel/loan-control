import { GetLoanByIdPaymentVO } from './valueObjects/get-loan-by-id-payment.vo';
import { GetLoanByIdPaymentsStatusVO } from './valueObjects/get-loan-by-id-payments-status.vo';

export type GetLoanByIdResultDTO = {
	name: string;
	totalFunded: number;
	createdAt: Date;
	updatedAt: Date;
	payments: GetLoanByIdPaymentVO[];
	paymentsStatus: GetLoanByIdPaymentsStatusVO;
};
