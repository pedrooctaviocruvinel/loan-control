import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { environment } from '@/environments/environment';
import { ResultWrapper } from '@/shared/types/resultWrapper';

import { GetLoanByIdResult } from './types/getLoanByIdResult';
import { GetLoanByIdResultPaymentDTO } from './types/getLoanByIdResultPaymentDTO';

@Component({
	selector: 'app-loan',
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatTableModule,
		CommonModule,
		MatSortModule,
		MatButtonModule,
	],
	templateUrl: './loan.component.html',
})
export class LoanComponent implements OnInit {
	constructor(private route: ActivatedRoute) {}

	loan: GetLoanByIdResult;
	paymentsDataSource = new MatTableDataSource<GetLoanByIdResultPaymentDTO>();
	paymentsDataSourceColumns = ['value', 'paid', 'expirationDate', 'actions'];

	@ViewChild(MatSort, { static: true }) sort: MatSort;

	async ngOnInit(): Promise<void> {
		const id = this.route.snapshot.paramMap.get('id');

		await this.getLoan(id!);
	}

	async getLoan(id: string): Promise<void> {
		const getLoanByIdResponse = await fetch(
			`${environment.serverUrl}/loans/${id}`
		);
		const getLoanByIdResult: ResultWrapper<GetLoanByIdResult> =
			await getLoanByIdResponse.json();

		this.loan = getLoanByIdResult.data;
		this.paymentsDataSource =
			new MatTableDataSource<GetLoanByIdResultPaymentDTO>(this.loan.payments);
		this.paymentsDataSource.sort = this.sort;
	}
}
