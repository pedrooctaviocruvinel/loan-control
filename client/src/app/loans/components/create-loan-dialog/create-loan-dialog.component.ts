import { Component } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';

import { ErrorComponent } from '@/app/shared/components/error/error.component';

import {
	CreateLoanPaymentDTO,
	CreateLoanRequestDTO,
} from '../../dtos/create-loan-request.dto';
import { LoanService } from '../../services/loan.service';

@Component({
	selector: 'app-create-loan-dialog',
	standalone: true,
	imports: [
		MatDialogModule,
		MatIconModule,
		MatButtonModule,
		MatStepperModule,
		MatInputModule,
		ReactiveFormsModule,
		MatStepperModule,
		MatProgressSpinnerModule,
		ErrorComponent,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSlideToggleModule,
	],
	templateUrl: './create-loan-dialog.component.html',
})
export class CreateLoanDialogComponent {
	constructor(
		private readonly dialogRef: MatDialogRef<CreateLoanDialogComponent>,
		private readonly formBuilder: FormBuilder,
		private readonly loanService: LoanService
	) {}

	createLoanForm = this.formBuilder.group({
		name: ['', [Validators.required, Validators.maxLength(25)]],
		totalFunded: ['', [Validators.required, Validators.min(1)]],
	});
	createLoanPaymentsForm = this.formBuilder.group({
		payments: this.formBuilder.array([]),
	});

	createLoanErrors: string[] = [];

	loadingCreateLoan: boolean = false;

	async createLoan(): Promise<void> {
		this.loadingCreateLoan = true;

		const loanPayments: CreateLoanPaymentDTO[] = this.loanPayments.value.map(
			(lp: { value: number; expirationDate: Date; paidDate: any }) => {
				let paidDate = lp.paidDate;

				if (lp.paidDate == '' || lp.paidDate == null) {
					paidDate = null;
				}

				return {
					value: lp.value,
					expirationDate: lp.expirationDate,
					paidDate: paidDate,
				};
			}
		);

		const createLoanRequest: CreateLoanRequestDTO = {
			name: this.createLoanForm.value.name,
			totalFunded: Number(this.createLoanForm.value.totalFunded),
			payments: loanPayments,
		};

		const createLoanResult = await this.loanService.create(createLoanRequest);

		if (createLoanResult.success) {
			this.dialogRef.close(createLoanResult);
		} else {
			this.createLoanErrors = createLoanResult.errors;
		}

		this.loadingCreateLoan = false;
	}

	addPayment(): void {
		const paymentForm = this.formBuilder.group({
			value: ['', [Validators.required, Validators.min(1)]],
			expirationDate: ['', [Validators.required]],
			paidDate: ['', []],
		});

		this.loanPayments.push(paymentForm);
	}

	removePayment(paymentIndex: number): void {
		this.loanPayments.removeAt(paymentIndex);
	}

	get loan() {
		return this.createLoanForm.controls;
	}

	get loanPayments() {
		return this.createLoanPaymentsForm.controls['payments'] as FormArray;
	}
}
