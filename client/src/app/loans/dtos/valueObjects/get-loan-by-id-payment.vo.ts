export type GetLoanByIdPaymentVO = {
	id: string;
	value: number;
	paid: boolean;
	expirationDate: Date;
	paidDate: Date;
};
