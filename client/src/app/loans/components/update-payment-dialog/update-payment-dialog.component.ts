import { Component, Inject, OnInit } from '@angular/core';
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

import { UpdatePaymentRequest } from '../../dtos/update-payment-request.dto';
import { PaymentService } from '../../services/payment.service';

@Component({
	selector: 'app-update-payment-dialog',
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
	templateUrl: './update-payment-dialog.component.html',
})
export class UpdatePaymentDialogComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA)
		private readonly updatePaymentData: {
			id: string;
			value: number;
			paid: boolean;
			expirationDate: Date;
		},
		private readonly dialogRef: MatDialogRef<UpdatePaymentDialogComponent>,
		private readonly formBuilder: FormBuilder,
		private readonly paymentService: PaymentService
	) {}

	updatePaymentForm: FormGroup = this.formBuilder.group({
		value: ['', [Validators.required, Validators.min(1)]],
		paid: [''],
		expirationDate: ['', [Validators.required]],
	});

	loadingUpdatePayment: boolean = false;

	updatePaymentErrorCode: number = 0;
	updatePaymentErrors: string[] = [];

	ngOnInit(): void {
		this.updatePaymentForm.patchValue({
			value: this.updatePaymentData.value,
			paid: this.updatePaymentData.paid,
			expirationDate: this.updatePaymentData.expirationDate,
		});
	}

	async updatePayment(): Promise<void> {
		this.loadingUpdatePayment = true;

		const updatePaymentRequest: UpdatePaymentRequest = {
			value: this.updatePaymentForm.value.value,
			expirationDate: this.updatePaymentForm.value.expirationDate,
			paid: this.updatePaymentForm.value.paid == true ? true : false,
		};

		const updatePaymentResult = await this.paymentService.update(
			this.updatePaymentData.id,
			updatePaymentRequest
		);

		this.updatePaymentErrorCode = updatePaymentResult.errorCode;
		this.updatePaymentErrors = updatePaymentResult.errors;

		this.loadingUpdatePayment = false;

		if (updatePaymentResult.success) {
			this.dialogRef.close(updatePaymentResult);
		}
	}

	get payment() {
		return this.updatePaymentForm.controls;
	}
}
