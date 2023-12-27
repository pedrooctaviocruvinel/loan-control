import { CreateLoanPaymentDTO } from './createLoanPaymentDTO';

export type CreateLoanRequest = {
	name: string;
	totalFunded: number;
	payments: CreateLoanPaymentDTO[];
};
