export type CreateLoanPaymentDTO = {
	value: number;
	paid: boolean;
	expirationDate: Date;
};

export type CreateLoanRequestDTO = {
	name: string;
	totalFunded: number;
	payments: CreateLoanPaymentDTO[];
};
