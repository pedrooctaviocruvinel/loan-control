import { Component, Inject } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
	MAT_DIALOG_DATA,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ErrorComponent } from '@/app/shared/components/error/error.component';
import { LoadingComponent } from '@/app/shared/components/loading/loading.component';

import { AddPaymentRequestDTO } from '../../dtos/add-payment-request.dto';
import { PaymentService } from '../../services/payment.service';

@Component({
	selector: 'app-add-payment-dialog',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MatInputModule,
		MatDatepickerModule,
		MatIconModule,
		MatNativeDateModule,
		MatSlideToggleModule,
		MatDialogModule,
		MatButtonModule,
		LoadingComponent,
		ErrorComponent,
	],
	templateUrl: './add-payment-dialog.component.html',
})
export class AddPaymentDialogComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA)
		private readonly addPaymentData: {
			loanId: string;
		},
		private readonly dialogRef: MatDialogRef<AddPaymentDialogComponent>,
		private readonly formBuilder: FormBuilder,
		private readonly paymentService: PaymentService
	) {}

	addPaymentForm: FormGroup = this.formBuilder.group({
		value: ['', [Validators.required, Validators.min(1)]],
		expirationDate: ['', [Validators.required]],
		paidDate: ['', []],
	});

	loadingAddPayment: boolean = false;

	addPaymentErrorCode: number = 0;
	addPaymentErrors: string[] = [];

	async addPayment(): Promise<void> {
		this.loadingAddPayment = true;

		const addPaymentRequest: AddPaymentRequestDTO = {
			value: this.addPaymentForm.value.value,
			expirationDate: this.addPaymentForm.value.expirationDate,
			paidDate:
				this.addPaymentForm.value.paidDate != ''
					? this.addPaymentForm.value.paidDate
					: null,
		};

		const addPaymentResult = await this.paymentService.add(
			this.addPaymentData.loanId,
			addPaymentRequest
		);

		this.addPaymentErrorCode = addPaymentResult.errorCode;
		this.addPaymentErrors = addPaymentResult.errors;

		this.loadingAddPayment = false;

		if (addPaymentResult.success) {
			this.dialogRef.close(addPaymentResult);
		}
	}

	get payment() {
		return this.addPaymentForm.controls;
	}
}
