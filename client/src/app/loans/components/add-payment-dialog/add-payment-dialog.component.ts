import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Inject } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
	MAT_DIALOG_DATA,
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

import { AddPaymentRequest } from './types/addPaymentRequest';

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
	templateUrl: './add-payment-dialog.component.html',
})
export class AddPaymentDialogComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) private loanId: string,
		public dialogRef: MatDialogRef<AddPaymentDialogComponent>,
		public formBuilder: FormBuilder
	) {
		this.addPaymentForm = formBuilder.group({
			value: ['', [Validators.required, Validators.min(1)]],
			paid: [''],
			expirationDate: ['', [Validators.required]],
		});
	}

	addPaymentForm: FormGroup;

	async addPaymentToLoan(): Promise<void> {
		const addPaymentRequest: AddPaymentRequest = {
			value: this.addPaymentForm.value.value,
			paid: this.addPaymentForm.value.paid == true ? true : false,
			expirationDate: this.addPaymentForm.value.expirationDate,
		};

		const addLoanResponse = await fetch(
			`${environment.serverUrl}/loans/${this.loanId}/payments`,
			{
				method: 'POST',
				headers: headers,
				body: JSON.stringify(addPaymentRequest),
			}
		);

		const addLoanResult: ResultWrapper<void> = await addLoanResponse.json();

		const dialogResult: DialogResult = {
			success: addLoanResult.success,
			errors: addLoanResult.errors,
		};

		this.dialogRef.close(dialogResult);
	}

	get payment() {
		return this.addPaymentForm.controls;
	}
}
