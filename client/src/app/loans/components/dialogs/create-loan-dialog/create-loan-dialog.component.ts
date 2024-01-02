import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';

import {
	CreateLoanPaymentDTO,
	CreateLoanRequestDTO,
} from '@/app/loans/dtos/create-loan-request.dto';
import { LoanService } from '@/app/loans/services/loan.service';
import { ErrorComponent } from '@/app/shared/components/error/error.component';
import { ResultWrapperModel } from '@/app/shared/models/result-wrapper.model';

@Component({
	selector: 'app-create-loan-dialog',
	standalone: true,
	imports: [
		MatInputModule,
		MatButtonModule,
		ReactiveFormsModule,
		MatStepperModule,
		MatSlideToggleModule,
		MatDatepickerModule,
		MatDialogModule,
		MatIconModule,
		MatProgressSpinnerModule,
		ErrorComponent,
	],
	providers: [
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: { showError: true },
		},
	],
	templateUrl: './create-loan-dialog.component.html',
})
export class CreateLoanDialogComponent {
	constructor(
		private dialogRef: MatDialogRef<CreateLoanDialogComponent>,
		private formBuilder: FormBuilder,
		private loanService: LoanService
	) {
		dialogRef.disableClose = true;
	}

	createLoanForm: FormGroup = this.formBuilder.group({
		name: ['', [Validators.required, Validators.maxLength(25)]],
		totalFunded: ['', [Validators.required, Validators.min(1)]],
	});
	createLoanPaymentsForm: FormGroup = this.formBuilder.group({
		payments: this.formBuilder.array([]),
	});
	loadingCreateLoan: boolean;
	createLoanResult: ResultWrapperModel<void>;
	errorOnCreateLoan: boolean;

	addPayment(): void {
		const paymentForm = this.formBuilder.group({
			value: ['', [Validators.required, Validators.min(1)]],
			paid: ['', []],
			expirationDate: ['', [Validators.required]],
		});

		this.payments.push(paymentForm);
	}

	removePayment(paymentIndex: number): void {
		this.payments.removeAt(paymentIndex);
	}

	async createLoan(): Promise<void> {
		this.loadingCreateLoan = true;

		const createLoanPayents: CreateLoanPaymentDTO[] =
			this.createLoanPaymentsForm.value.payments.map(
				(p: CreateLoanPaymentDTO) => ({
					value: p.value,
					paid: p.paid == true ? true : false,
					expirationDate: p.expirationDate,
				})
			);

		const createLoanRequest: CreateLoanRequestDTO = {
			name: this.createLoanForm.value.name,
			totalFunded: this.createLoanForm.value.totalFunded,
			payments: createLoanPayents,
		};

		this.createLoanResult = await this.loanService.create(createLoanRequest);

		if (this.createLoanResult.success) {
			this.dialogRef.close(this.createLoanResult);
		} else {
			this.errorOnCreateLoan = true;
		}

		this.loadingCreateLoan = false;
	}

	get loan() {
		return this.createLoanForm.controls;
	}

	get payments() {
		return this.createLoanPaymentsForm.controls['payments'] as FormArray;
	}
}
