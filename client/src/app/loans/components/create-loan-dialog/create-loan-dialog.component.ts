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
import {
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogModule,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';

import { environment } from '@/environments/environment';
import { headers } from '@/shared/headers';
import { DialogResult } from '@/shared/types/dialogResult';
import { ResultWrapper } from '@/shared/types/resultWrapper';

import { CreateLoanPaymentDTO } from '../../types/createLoanPaymentDTO';
import { CreateLoanRequest } from '../../types/createLoanRequest';

@Component({
	selector: 'app-create-loan-dialog',
	standalone: true,
	imports: [
		MatInputModule,
		MatButtonModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		ReactiveFormsModule,
		MatStepperModule,
		MatSlideToggleModule,
		MatDatepickerModule,
		MatDialogModule,
		MatDividerModule,
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
		public dialogRef: MatDialogRef<CreateLoanDialogComponent>,
		public formBuilder: FormBuilder
	) {
		this.createLoanForm = formBuilder.group({
			name: ['', [Validators.required, Validators.maxLength(25)]],
			totalFunded: ['', [Validators.required, Validators.min(1)]],
		});

		this.createLoanPaymentsForm = formBuilder.group({
			payments: formBuilder.array([]),
		});
	}

	createLoanForm: FormGroup;
	createLoanPaymentsForm: FormGroup;

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
		const payments: CreateLoanPaymentDTO[] =
			this.createLoanPaymentsForm.value.payments.map(
				(p: CreateLoanPaymentDTO) => ({
					value: p.value,
					paid: p.paid == true ? true : false,
					expirationDate: p.expirationDate,
				})
			);

		const createLoanRequest: CreateLoanRequest = {
			name: this.createLoanForm.value.name,
			totalFunded: this.createLoanForm.value.totalFunded,
			payments: payments,
		};

		const createLoanResponse = await fetch(environment.serverUrl + '/loans', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(createLoanRequest),
		});

		const createLoanResult: ResultWrapper<void> =
			await createLoanResponse.json();

		const dialogResult: DialogResult = {
			success: createLoanResult.success,
			errors: createLoanResult.errors,
		};

		this.dialogRef.close(dialogResult);
	}

	get loan() {
		return this.createLoanForm.controls;
	}

	get payments() {
		return this.createLoanPaymentsForm.controls['payments'] as FormArray;
	}
}
