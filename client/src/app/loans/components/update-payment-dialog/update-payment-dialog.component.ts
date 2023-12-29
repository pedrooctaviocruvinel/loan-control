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

import { UpdatePaymentRequest } from './types/updatePaymentRequest';

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
	templateUrl: './update-payment-dialog.component.html',
})
export class UpdatePaymentDialogComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA)
		private paymentDTO: {
			id: string;
			value: number;
			paid: boolean;
			expirationDate: Date;
		},
		public dialogRef: MatDialogRef<UpdatePaymentDialogComponent>,
		public formBuilder: FormBuilder
	) {
		this.updatePaymentForm = formBuilder.group({
			value: ['', [Validators.required, Validators.min(1)]],
			paid: [''],
			expirationDate: ['', [Validators.required]],
		});

		this.updatePaymentForm.patchValue({
			value: this.paymentDTO.value,
			paid: this.paymentDTO.paid,
			expirationDate: this.paymentDTO.expirationDate,
		});
	}

	updatePaymentForm: FormGroup;

	async updatePayment(): Promise<void> {
		const updatePaymentRequest: UpdatePaymentRequest = {
			value: this.updatePaymentForm.value.value,
			paid: this.updatePaymentForm.value.paid == true ? true : false,
			expirationDate: this.updatePaymentForm.value.expirationDate,
		};

		const updatePaymentResponse = await fetch(
			`${environment.serverUrl}/loans/payments/${this.paymentDTO.id}`,
			{
				method: 'PUT',
				headers: headers,
				body: JSON.stringify(updatePaymentRequest),
			}
		);

		const updateLoanResult: ResultWrapper<void> =
			await updatePaymentResponse.json();

		const dialogResult: DialogResult = {
			success: updateLoanResult.success,
			errors: updateLoanResult.errors,
		};

		this.dialogRef.close(dialogResult);
	}

	get payment() {
		return this.updatePaymentForm.controls;
	}
}
