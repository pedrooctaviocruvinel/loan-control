import { Routes } from '@angular/router';

import { BackupComponent } from './backup/backup/backup.component';
import { GetLoanByIdComponent } from './loans/components/get-loan-by-id/get-loan-by-id.component';
import { ListLoansComponent } from './loans/components/list-loans/list-loans.component';

export const routes: Routes = [
	{
		path: 'backup',
		component: BackupComponent,
	},
	{
		path: 'loans',
		component: ListLoansComponent,
	},
	{ path: 'loans/:id', component: GetLoanByIdComponent },
];
