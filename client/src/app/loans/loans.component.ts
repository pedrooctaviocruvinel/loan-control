import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { environment } from '@/environments/environment';
import { ResultWrapper } from '@/shared/types/resultWrapper';

import { CreateLoanDialogComponent } from './components/create-loan-dialog/create-loan-dialog.component';
import { ListLoansResult } from './listLoansResult';

@Component({
	selector: 'app-loans',
	standalone: true,
	imports: [
		MatButtonModule,
		MatTableModule,
		CommonModule,
		MatSortModule,
		MatCardModule,
		MatIconModule,
		MatDialogModule,
	],
	templateUrl: './loans.component.html',
})
export class LoansComponent implements OnInit {
	constructor(private dialog: MatDialog) {}

	loansDataSource = new MatTableDataSource<ListLoansResult>();
	loansDataSourceColumns = ['name', 'totalFunded', 'createdAt'];

	@ViewChild(MatSort) sort: MatSort;

	async ngOnInit(): Promise<void> {
		await this.listLoans();
	}

	openCreateLoanDialog(): void {
		const dialogRef = this.dialog.open(CreateLoanDialogComponent, {
			width: '100%',
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('result', result);

			this.listLoans();
		});
	}

	async listLoans(): Promise<void> {
		const listLoansResponse = await fetch(environment.serverUrl + '/loans');
		const listLoansResult: ResultWrapper<ListLoansResult[]> =
			await listLoansResponse.json();

		this.loansDataSource = new MatTableDataSource<ListLoansResult>(
			listLoansResult.data
		);
		this.loansDataSource.sort = this.sort;
	}
}
