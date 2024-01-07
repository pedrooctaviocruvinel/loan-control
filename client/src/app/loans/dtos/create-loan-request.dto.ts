import { CreateLoanPaymentVO } from './valueObjects/create-loan-payment.vo';

export type CreateLoanRequestDTO = {
	name: string;
	totalFunded: number;
	payments: CreateLoanPaymentVO[];
};
