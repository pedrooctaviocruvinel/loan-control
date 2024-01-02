export type GetLoanByIdResultPaymentDTO = {
	id: string;
	value: number;
	paid: boolean;
	expirationDate: Date;
};

export type GetLoanByIdResultDTO = {
	name: string;
	totalFunded: number;
	createdAt: Date;
	updatedAt: Date;
	payments: GetLoanByIdResultPaymentDTO[];
};
