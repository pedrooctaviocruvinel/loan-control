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
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { environment } from '@/environments/environment';
import { headers } from '@/shared/headers';
import { DialogResult } from '@/shared/types/dialogResult';
import { ResultWrapper } from '@/shared/types/resultWrapper';

import { AddPaymentRequest } from './types/addPaymentRequest';

@Component({
	selector: 'app-add-payment-dialog',
	standalone: true,
	imports: [
		MatInputModule,
		MatButtonModule,
		ReactiveFormsModule,
		MatSlideToggleModule,
		MatDatepickerModule,
		MatDialogModule,
		MatIconModule,
	],
	templateUrl: './add-payment-dialog.component.html',
})
export class AddPaymentDialogComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) private loanId: string,
		public dialogRef: MatDialogRef<AddPaymentDialogComponent>,
		public formBuilder: FormBuilder
	) {}

	addPaymentForm: FormGroup = this.formBuilder.group({
		value: ['', [Validators.required, Validators.min(1)]],
		paid: [''],
		expirationDate: ['', [Validators.required]],
	});

	async addPayment(): Promise<void> {
		const addPaymentRequest: AddPaymentRequest = {
			value: this.addPaymentForm.value.value,
			paid: this.addPaymentForm.value.paid == true ? true : false,
			expirationDate: this.addPaymentForm.value.expirationDate,
		};

		const addPaymentResponse = await fetch(
			`${environment.serverUrl}/loans/${this.loanId}/payments`,
			{
				method: 'POST',
				headers: headers,
				body: JSON.stringify(addPaymentRequest),
			}
		);

		const addPaymentResult: ResultWrapper<void> =
			await addPaymentResponse.json();

		const dialogResult: DialogResult = {
			success: addPaymentResult.success,
			errors: addPaymentResult.errors,
		};

		this.dialogRef.close(dialogResult);
	}

	get payment() {
		return this.addPaymentForm.controls;
	}
}
