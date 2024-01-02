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

import { AddPaymentRequestDTO } from '@/app/loans/dtos/add-payment-request.dto';
import { LoanService } from '@/app/loans/services/loan.service';

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
		private dialogRef: MatDialogRef<AddPaymentDialogComponent>,
		private formBuilder: FormBuilder,
		private loanService: LoanService
	) {}

	addPaymentForm: FormGroup = this.formBuilder.group({
		value: ['', [Validators.required, Validators.min(1)]],
		paid: [''],
		expirationDate: ['', [Validators.required]],
	});

	async addPayment(): Promise<void> {
		const addPaymentRequest: AddPaymentRequestDTO = {
			value: this.addPaymentForm.value.value,
			paid: this.addPaymentForm.value.paid == true ? true : false,
			expirationDate: this.addPaymentForm.value.expirationDate,
		};

		const addPaymentResult = await this.loanService.addPayment(
			this.loanId,
			addPaymentRequest
		);

		this.dialogRef.close(addPaymentResult);
	}

	get payment() {
		return this.addPaymentForm.controls;
	}
}
