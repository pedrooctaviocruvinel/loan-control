import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { ErrorComponent } from '@/app/shared/components/error/error.component';
import { LoadingComponent } from '@/app/shared/components/loading/loading.component';

import { ListLoansResultDTO } from '../../dtos/list-loans-result.dto';
import { LoanService } from '../../services/loan.service';

@Component({
	selector: 'app-list-loans',
	standalone: true,
	imports: [
		MatTableModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		MatSortModule,
		CommonModule,
		ErrorComponent,
		LoadingComponent,
	],
	templateUrl: './list-loans.component.html',
})
export class ListLoansComponent implements OnInit {
	constructor(private readonly loanService: LoanService) {}

	async ngOnInit(): Promise<void> {
		this.listLoans();
	}

	loansDataSource = new MatTableDataSource<ListLoansResultDTO>();
	loansDataSourceColumns = ['name', 'totalFunded', 'createdAt'];
	loansDataSourceSort: MatSort;

	listLoansErrors: string[] = [];

	loadingListLoans: boolean = false;

	async listLoans(): Promise<void> {
		this.loadingListLoans = true;

		const listLoansResult = await this.loanService.list();

		if (listLoansResult.success) {
			this.loansDataSource = new MatTableDataSource<ListLoansResultDTO>(
				listLoansResult.data
			);
			this.loansDataSource.sort = this.loansDataSourceSort;
		} else {
			this.listLoansErrors = listLoansResult.errors;
		}

		this.loadingListLoans = false;
	}

	@ViewChild(MatSort) set loansSort(matSort: MatSort) {
		this.loansDataSourceSort = matSort;
		this.loansDataSource.sort = this.loansDataSourceSort;
	}
}
