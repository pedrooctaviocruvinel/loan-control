import { GetLoanByIdResultPaymentDTO } from './getLoanByIdResultPaymentDTO';

export type GetLoanByIdResult = {
	name: string;
	totalFunded: number;
	createdAt: Date;
	updatedAt: Date;
	payments: GetLoanByIdResultPaymentDTO[];
};
