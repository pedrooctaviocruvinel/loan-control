import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { ErrorComponent } from '@/app/shared/components/error/error.component';
import { ResultWrapperModel } from '@/app/shared/models/result-wrapper.model';

import { ListLoansResultDTO } from '../../dtos/list-loans-result.dto';
import { LoanService } from '../../services/loan.service';
import { CreateLoanDialogComponent } from '../dialogs/create-loan-dialog/create-loan-dialog.component';

@Component({
	selector: 'app-list-loans',
	standalone: true,
	imports: [
		MatButtonModule,
		MatTableModule,
		CommonModule,
		MatSortModule,
		MatCardModule,
		MatIconModule,
		MatDialogModule,
		MatProgressSpinnerModule,
		ErrorComponent,
	],
	templateUrl: './list-loans.component.html',
})
export class ListLoansComponent implements OnInit {
	constructor(
		private dialog: MatDialog,
		private loanService: LoanService
	) {}

	listLoansResultDataSource = new MatTableDataSource<ListLoansResultDTO>();
	listLoansResultDataSourceColumns = ['name', 'totalFunded', 'createdAt'];
	loadingListLoans: boolean;
	listLoansResult: ResultWrapperModel<ListLoansResultDTO[]>;
	sort: MatSort;

	async ngOnInit(): Promise<void> {
		await this.listLoans();
	}

	setDataSourceAttributes(): void {
		this.listLoansResultDataSource.sort = this.sort;
	}

	openCreateLoanDialog(): void {
		const dialogRef = this.dialog.open(CreateLoanDialogComponent, {
			width: '100%',
		});

		dialogRef.afterClosed().subscribe((result: ResultWrapperModel<void>) => {
			if (result.success) {
				this.listLoans();
			}
		});
	}

	async listLoans(): Promise<void> {
		this.loadingListLoans = true;

		this.listLoansResult = await this.loanService.list();

		if (this.listLoansResult.success) {
			this.listLoansResultDataSource =
				new MatTableDataSource<ListLoansResultDTO>(this.listLoansResult.data);
			this.listLoansResultDataSource.sort = this.sort;
		}

		this.loadingListLoans = false;
	}

	@ViewChild(MatSort) set matSort(ms: MatSort) {
		this.sort = ms;
		this.setDataSourceAttributes();
	}
}
