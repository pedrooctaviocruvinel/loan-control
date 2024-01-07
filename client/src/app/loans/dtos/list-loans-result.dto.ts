export type ListLoansResultDTO = {
	loans: ListLoansLoanDTO[];
	paymentsStatus: ListLoansPaymentsStatusDTO;
};

export type ListLoansLoanDTO = {
	id: string;
	name: string;
	totalFunded: number;
	createdAt: Date;
};

export type ListLoansPaymentsStatusDTO = {
	totalFunded: number;
	totalToBeReceived: number;
	totalReceived: number;
	expectedProfit: number;
	profit: number;
};
