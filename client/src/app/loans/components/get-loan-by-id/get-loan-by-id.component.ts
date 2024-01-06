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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ErrorComponent } from '@/app/shared/components/error/error.component';
import { LoadingComponent } from '@/app/shared/components/loading/loading.component';
import { ResultWrapperModel } from '@/app/shared/models/result-wrapper.model';

import { GetLoanByIdResultPaymentDTO } from '../../dtos/get-loan-by-id-result.dto';
import { UpdateLoanRequestDTO } from '../../dtos/update-loan-request.dto';
import { LoanService } from '../../services/loan.service';
import { PaymentService } from '../../services/payment.service';
import { AddPaymentDialogComponent } from '../add-payment-dialog/add-payment-dialog.component';
import { UpdatePaymentDialogComponent } from '../update-payment-dialog/update-payment-dialog.component';

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
		MatDialogModule,
	],
	templateUrl: './get-loan-by-id.component.html',
})
export class GetLoanByIdComponent implements OnInit {
	constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly formBuilder: FormBuilder,
		private readonly loanService: LoanService,
		private readonly paymentService: PaymentService,
		private readonly toastrService: ToastrService,
		private readonly matDialog: MatDialog
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

	updateLoanErrorCode: number = 0;
	updateLoanErrors: string[] = [];

	loadingGetLoanById: boolean = false;
	loadingUpdateLoan: boolean = false;
	loadingRemovePayment: boolean = false;

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');

		this.getLoanById(this.id);
	}

	openAddPaymentDialog(): void {
		const dialogRef = this.matDialog.open(AddPaymentDialogComponent, {
			data: {
				loanId: this.id,
			},
			width: '100%',
			disableClose: true,
		});

		dialogRef.afterClosed().subscribe((result: ResultWrapperModel<void>) => {
			if (result.success) {
				this.toastrService.success('Added successfully', 'Add Payment');

				if (result) this.getLoanById(this.id);
			}
		});
	}

	openUpdatePaymentDialog(
		id: string,
		value: number,
		paid: boolean,
		expirationDate: Date
	): void {
		const dialogRef = this.matDialog.open(UpdatePaymentDialogComponent, {
			data: {
				id,
				value,
				paid,
				expirationDate,
			},
			width: '100%',
			disableClose: true,
		});

		dialogRef.afterClosed().subscribe((result: ResultWrapperModel<void>) => {
			if (result.success) {
				this.toastrService.success('Updated successfully', 'Update Payment');

				if (result) this.getLoanById(this.id);
			}
		});
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

	async update(): Promise<void> {
		this.loadingUpdateLoan = true;

		const updateLoanRequest: UpdateLoanRequestDTO = {
			name: this.updateLoanForm.value.name,
			totalFunded: this.updateLoanForm.value.totalFunded,
		};

		const updateLoanResult = await this.loanService.update(
			this.id,
			updateLoanRequest
		);

		if (!updateLoanResult.success) {
			this.updateLoanErrorCode = updateLoanResult.errorCode;
			this.updateLoanErrors = updateLoanResult.errors;

			this.toastrService.error('Error on Update Loan', 'Update Loan');
		} else {
			this.toastrService.success('Update successfully', 'Update Loan');

			this.getLoanById(this.id);
		}

		this.loadingUpdateLoan = false;
	}

	async removePayment(id: string): Promise<void> {
		this.loadingRemovePayment = true;

		const removePaymentResult = await this.paymentService.remove(id);

		if (!removePaymentResult.success) {
			let message = 'Unexpected error';

			if (removePaymentResult.errorCode == 2) {
				message = "Payment doesn't exists";
			}

			this.toastrService.error(message, 'Remove Payment');
		} else {
			this.toastrService.success('Payment removed', 'Remove Payment');

			this.getLoanById(this.id);
		}

		this.loadingRemovePayment = false;
	}

	get loan() {
		return this.updateLoanForm.controls;
	}

	@ViewChild(MatSort) set paymentsSort(matSort: MatSort) {
		this.paymentsDataSourceSort = matSort;
		this.paymentsaymentsDataSource.sort = this.paymentsDataSourceSort;
	}
}
