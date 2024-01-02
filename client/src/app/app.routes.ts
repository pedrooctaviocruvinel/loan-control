import { Routes } from '@angular/router';

import { GetLoanByIdComponent } from './loans/components/get-loan-by-id/get-loan-by-id.component';
import { ListLoansComponent } from './loans/components/list-loans/list-loans.component';

export const routes: Routes = [
	{ path: 'loans', component: ListLoansComponent },
	{ path: 'loans/:id', component: GetLoanByIdComponent },
];
