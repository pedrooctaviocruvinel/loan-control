import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { ErrorComponent } from '@/app/shared/components/error/error.component';
import { LoadingComponent } from '@/app/shared/components/loading/loading.component';
import { ResultWrapperModel } from '@/app/shared/models/result-wrapper.model';

import {
	ListLoansLoanDTO,
	ListLoansPaymentsStatusDTO,
} from '../../dtos/list-loans-result.dto';
import { LoanService } from '../../services/loan.service';
import { CreateLoanDialogComponent } from '../create-loan-dialog/create-loan-dialog.component';
import { LoanPaymentStatusComponent } from '../get-loan-by-id/components/loan-payment-status/loan-payment-status.component';

@Component({
	selector: 'app-list-loans',
	standalone: true,
	imports: [
		MatTableModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		MatSortModule,
		MatDialogModule,
		CommonModule,
		ErrorComponent,
		LoadingComponent,
		RouterModule,
		LoanPaymentStatusComponent,
	],
	templateUrl: './list-loans.component.html',
})
export class ListLoansComponent implements OnInit {
	constructor(
		private readonly loanService: LoanService,
		private readonly matDialog: MatDialog
	) {}

	async ngOnInit(): Promise<void> {
		this.listLoans();
	}

	loansDataSource = new MatTableDataSource<ListLoansLoanDTO>();
	loansDataSourceColumns = ['name', 'totalFunded', 'createdAt'];
	loansDataSourceSort: MatSort;

	paymentsStatus: ListLoansPaymentsStatusDTO;

	listLoansErrors: string[] = [];

	loadingListLoans: boolean = false;

	async listLoans(): Promise<void> {
		this.loadingListLoans = true;

		const listLoansResult = await this.loanService.list();

		if (listLoansResult.success) {
			this.loansDataSource = new MatTableDataSource<ListLoansLoanDTO>(
				listLoansResult.data.loans
			);
			this.loansDataSource.sort = this.loansDataSourceSort;

			this.paymentsStatus = listLoansResult.data.paymentsStatus;
		} else {
			this.listLoansErrors = listLoansResult.errors;
		}

		this.loadingListLoans = false;
	}

	openCreateLoanDialog(): void {
		const dialogRef = this.matDialog.open(CreateLoanDialogComponent, {
			width: '100%',
			disableClose: true,
		});

		dialogRef.afterClosed().subscribe((result: ResultWrapperModel<void>) => {
			if (result.success) {
				this.listLoans();
			}
		});
	}

	@ViewChild(MatSort) set loansSort(matSort: MatSort) {
		this.loansDataSourceSort = matSort;
		this.loansDataSource.sort = this.loansDataSourceSort;
	}
}
