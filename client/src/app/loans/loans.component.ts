import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { DialogResult } from '@/shared/types/dialogResult';
import { ResultWrapper } from '@/shared/types/resultWrapper';

import { CreateLoanDialogComponent } from './components/create-loan-dialog/create-loan-dialog.component';
import { ListLoansResult } from './listLoansResult';

@Component({
	selector: 'app-loan',
	standalone: true,
	imports: [
		MatButtonModule,
		MatTableModule,
		CommonModule,
		MatSortModule,
		MatDialogModule,
		ReactiveFormsModule,
	],
	templateUrl: './loans.component.html',
})
export class LoansComponent implements OnInit {
	constructor(public dialog: MatDialog) {}

	dialogResult: DialogResult;

	openDialog(): void {
		const dialogRef = this.dialog.open(CreateLoanDialogComponent, {
			width: '100%',
			data: this.dialogResult,
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('result', result);
		});
	}

	async ngOnInit(): Promise<void> {
		await this.listLoans();
	}

	public loansDataSource = new MatTableDataSource<ListLoansResult>();
	loansDataSourceColumns = ['name', 'value', 'createdAt'];

	@ViewChild(MatSort) sort: MatSort;

	async listLoans(): Promise<void> {
		const listLoansResponse = await fetch('https://localhost:64950/api/Loans');
		const listLoansResult: ResultWrapper<ListLoansResult[]> =
			await listLoansResponse.json();

		this.loansDataSource = new MatTableDataSource<ListLoansResult>(
			listLoansResult.data
		);
		this.loansDataSource.sort = this.sort;
	}
}
