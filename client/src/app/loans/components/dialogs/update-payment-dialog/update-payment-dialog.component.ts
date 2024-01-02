import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, Inject, OnInit } from '@angular/core';
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

import { UpdatePaymentRequestDTO } from '@/app/loans/dtos/update-payment-request.dto';
import { LoanService } from '@/app/loans/services/loan.service';

@Component({
	selector: 'app-update-payment-dialog',
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
	providers: [
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: { showError: true },
		},
	],
	templateUrl: './update-payment-dialog.component.html',
})
export class UpdatePaymentDialogComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA)
		private paymentDTO: {
			id: string;
			value: number;
			paid: boolean;
			expirationDate: Date;
		},
		private dialogRef: MatDialogRef<UpdatePaymentDialogComponent>,
		private formBuilder: FormBuilder,
		private loanService: LoanService
	) {}

	updatePaymentForm: FormGroup = this.formBuilder.group({
		value: ['', [Validators.required, Validators.min(1)]],
		paid: [''],
		expirationDate: ['', [Validators.required]],
	});

	ngOnInit(): void {
		this.updatePaymentForm.patchValue({
			value: this.paymentDTO.value,
			paid: this.paymentDTO.paid,
			expirationDate: this.paymentDTO.expirationDate,
		});
	}

	async updatePayment(): Promise<void> {
		const updatePaymentRequest: UpdatePaymentRequestDTO = {
			value: this.updatePaymentForm.value.value,
			paid: this.updatePaymentForm.value.paid == true ? true : false,
			expirationDate: this.updatePaymentForm.value.expirationDate,
		};

		const updateLoanResult = await this.loanService.updatePayment(
			this.paymentDTO.id,
			updatePaymentRequest
		);

		this.dialogRef.close(updateLoanResult);
	}

	get payment() {
		return this.updatePaymentForm.controls;
	}
}
