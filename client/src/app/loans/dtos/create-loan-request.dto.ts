export type CreateLoanPaymentDTO = {
	value: number;
	expirationDate: Date;
	paidDate: Date;
};

export type CreateLoanRequestDTO = {
	name: string;
	totalFunded: number;
	payments: CreateLoanPaymentDTO[];
};
