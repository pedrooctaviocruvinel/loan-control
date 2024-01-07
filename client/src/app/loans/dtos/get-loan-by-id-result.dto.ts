export type GetLoanByIdResultPaymentDTO = {
	id: string;
	value: number;
	paid: boolean;
	expirationDate: Date;
	paidDate: Date;
};

export type GetLoanByIdLoanPaymentsStatusDTO = {
	paymentsCount: number;
	paymentsPaid: number;
	nextPaymentDate: Date;
	remainingPayments: number;
	totalToBeReceived: number;
	totalReceived: number;
	expectedProfit: number;
	profit: number;
};

export type GetLoanByIdResultDTO = {
	name: string;
	totalFunded: number;
	createdAt: Date;
	updatedAt: Date;
	payments: GetLoanByIdResultPaymentDTO[];
	loanPaymentsStatus: GetLoanByIdLoanPaymentsStatusDTO;
};
