import { Routes } from '@angular/router';

import { LoanComponent } from './loans/components/loan/loan.component';
import { LoansComponent } from './loans/loans.component';

export const routes: Routes = [
	{ path: 'loans', component: LoansComponent },
	{ path: 'loans/:id', component: LoanComponent },
];
