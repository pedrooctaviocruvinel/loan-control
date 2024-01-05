import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { ErrorComponent } from '@/app/shared/components/error/error.component';
import { LoadingComponent } from '@/app/shared/components/loading/loading.component';

import { GetLoanByIdResultPaymentDTO } from '../../dtos/get-loan-by-id-result.dto';
import { LoanService } from '../../services/loan.service';

@Component({
	selector: 'app-get-loan-by-id',
	standalone: true,
	imports: [
		MatCardModule,
		LoadingComponent,
		ErrorComponent,
		MatInputModule,
		ReactiveFormsModule,
		MatIconModule,
		MatDatepickerModule,
		MatTableModule,
		MatButtonModule,
		MatSortModule,
		CommonModule,
	],
	templateUrl: './get-loan-by-id.component.html',
})
export class GetLoanByIdComponent implements OnInit {
	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly formBuilder: FormBuilder,
		private readonly loanService: LoanService
	) {}

	id: string;

	updateLoanForm: FormGroup = this.formBuilder.group({
		name: ['', [Validators.required, Validators.maxLength(25)]],
		totalFunded: ['', [Validators.required, Validators.min(1)]],
		createdAt: [''],
		updatedAt: [''],
	});

	paymentsaymentsDataSource =
		new MatTableDataSource<GetLoanByIdResultPaymentDTO>();
	paymentsaymentsDataSourceColumns = [
		'value',
		'paid',
		'expirationDate',
		'actions',
	];
	paymentsDataSourceSort: MatSort;

	getLoanByIdErrorCode: number = 0;
	getLoanByIdErrors: string[] = [];

	loadingGetLoanById: boolean = false;

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');

		this.getLoanById(this.id);
	}

	async getLoanById(id: string): Promise<void> {
		this.loadingGetLoanById = true;

		const getLoanByIdResult = await this.loanService.getById(id);

		this.getLoanByIdErrorCode = getLoanByIdResult.errorCode;
		this.getLoanByIdErrors = getLoanByIdResult.errors;

		if (getLoanByIdResult.success) {
			this.updateLoanForm.patchValue({
				name: getLoanByIdResult.data.name,
				totalFunded: getLoanByIdResult.data.totalFunded,
				createdAt: getLoanByIdResult.data.createdAt,
				updatedAt: getLoanByIdResult.data.updatedAt,
			});

			this.paymentsaymentsDataSource =
				new MatTableDataSource<GetLoanByIdResultPaymentDTO>(
					getLoanByIdResult.data.payments
				);
		}

		this.loadingGetLoanById = false;
	}

	get loan() {
		return this.updateLoanForm.controls;
	}

	@ViewChild(MatSort) set paymentsSort(matSort: MatSort) {
		this.paymentsDataSourceSort = matSort;
		this.paymentsaymentsDataSource.sort = this.paymentsDataSourceSort;
	}
}
