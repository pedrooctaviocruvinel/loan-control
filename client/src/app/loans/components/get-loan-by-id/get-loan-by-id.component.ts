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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { ErrorComponent } from '@/app/shared/components/error/error.component';
import { ResultWrapperModel } from '@/app/shared/models/result-wrapper.model';

import {
	GetLoanByIdResultDTO,
	GetLoanByIdResultPaymentDTO,
} from '../../dtos/get-loan-by-id-result.dto';
import { UpdateLoanRequestDTO } from '../../dtos/update-loan-request.dto';
import { LoanService } from '../../services/loan.service';
import { AddPaymentDialogComponent } from '../dialogs/add-payment-dialog/add-payment-dialog.component';
import { UpdatePaymentDialogComponent } from '../dialogs/update-payment-dialog/update-payment-dialog.component';

@Component({
	selector: 'app-get-loan-by-id',
	standalone: true,
	imports: [
		MatButtonModule,
		MatTableModule,
		CommonModule,
		MatSortModule,
		MatDialogModule,
		ReactiveFormsModule,
		MatDatepickerModule,
		MatInputModule,
		MatFormFieldModule,
		MatCardModule,
		MatIconModule,
		MatProgressSpinnerModule,
		ErrorComponent,
	],
	templateUrl: './get-loan-by-id.component.html',
})
export class GetLoanByIdComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private dialog: MatDialog,
		private loanService: LoanService
	) {}

	id: string;
	loadingGetLoanById: boolean = true;
	getLoanByIdPaymentsDataSource =
		new MatTableDataSource<GetLoanByIdResultPaymentDTO>();
	getLoanByIdPaymentsResultColumns = [
		'value',
		'paid',
		'expirationDate',
		'actions',
	];
	getLoanByIdResult: ResultWrapperModel<GetLoanByIdResultDTO>;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	updateLoanForm: FormGroup = this.formBuilder.group({
		name: ['', [Validators.required, Validators.maxLength(25)]],
		totalFunded: ['', [Validators.required, Validators.min(1)]],
		createdAt: [''],
		updatedAt: [''],
	});

	async ngOnInit(): Promise<void> {
		this.id = this.route.snapshot.paramMap.get('id')!;

		await this.getLoan(this.id);
	}

	async getLoan(id: string): Promise<void> {
		this.loadingGetLoanById = true;

		this.getLoanByIdResult = await this.loanService.getById(id);
		console.log(this.getLoanByIdResult);

		if (this.getLoanByIdResult.success) {
			this.updateLoanForm.patchValue({
				name: this.getLoanByIdResult.data.name,
				totalFunded: this.getLoanByIdResult.data.totalFunded,
				createdAt: this.getLoanByIdResult.data.createdAt,
				updatedAt: this.getLoanByIdResult.data.updatedAt,
			});
			this.getLoanByIdPaymentsDataSource =
				new MatTableDataSource<GetLoanByIdResultPaymentDTO>(
					this.getLoanByIdResult.data.payments
				);
			this.getLoanByIdPaymentsDataSource.sort = this.sort;
		}

		this.loadingGetLoanById = false;
	}

	async updateLoan(): Promise<void> {
		const updateLoanRequest: UpdateLoanRequestDTO = {
			name: this.updateLoanForm.value.name,
			totalFunded: this.updateLoanForm.value.totalFunded,
		};

		const updateLoanResult = await this.loanService.update(
			this.id,
			updateLoanRequest
		);

		console.log(updateLoanResult);
	}

	async deleteLoan(): Promise<void> {
		const deleteLoanResult = await this.loanService.delete(this.id);

		console.log(deleteLoanResult);
	}

	async removePayment(id: string): Promise<void> {
		const removePaymentResult = await this.loanService.removePayment(id);

		console.log(removePaymentResult);
	}

	openAddPaymentDialog(): void {
		const dialogRef = this.dialog.open(AddPaymentDialogComponent, {
			data: this.id,
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('result', result);

			this.getLoan(this.id);
		});
	}

	openUpdatePaymentDialog(
		id: string,
		value: number,
		paid: boolean,
		expirationDate: Date
	): void {
		const dialogRef = this.dialog.open(UpdatePaymentDialogComponent, {
			data: {
				id: id,
				value: value,
				paid: paid,
				expirationDate: expirationDate,
			},
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('result', result);

			this.getLoan(this.id);
		});
	}

	get loan() {
		return this.updateLoanForm.controls;
	}
}
