export type GetLoanByIdPaymentsStatusVO = {
	paymentsCount: number;
	paymentsPaid: number;
	nextPaymentDate: Date;
	remainingPayments: number;
	totalToBeReceived: number;
	totalReceived: number;
	expectedProfit: number;
	profit: number;
};
