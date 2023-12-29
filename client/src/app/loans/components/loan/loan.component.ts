import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { environment } from '@/environments/environment';
import { headers } from '@/shared/headers';
import { ResultWrapper } from '@/shared/types/resultWrapper';

import { AddPaymentDialogComponent } from '../add-payment-dialog/add-payment-dialog.component';
import { UpdatePaymentDialogComponent } from '../update-payment-dialog/update-payment-dialog.component';
import { GetLoanByIdResult } from './types/getLoanByIdResult';
import { GetLoanByIdResultPaymentDTO } from './types/getLoanByIdResultPaymentDTO';
import { UpdateLoanRequest } from './types/updateLoanRequest';

@Component({
	selector: 'app-loan',
	standalone: true,
	imports: [
		MatButtonModule,
		MatTableModule,
		CommonModule,
		MatSortModule,
		MatDialogModule,
		ReactiveFormsModule,
		MatDatepickerModule,
		MatInputModule,
		MatFormFieldModule,
		MatCardModule,
		MatIconModule,
	],
	templateUrl: './loan.component.html',
})
export class LoanComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private dialog: MatDialog
	) {}

	id: string;

	paymentsDataSource = new MatTableDataSource<GetLoanByIdResultPaymentDTO>();
	paymentsDataSourceColumns = ['value', 'paid', 'expirationDate', 'actions'];

	updateLoanForm: FormGroup = this.formBuilder.group({
		name: ['', [Validators.required, Validators.maxLength(25)]],
		totalFunded: ['', [Validators.required, Validators.min(1)]],
		createdAt: [''],
		updatedAt: [''],
	});

	@ViewChild(MatSort, { static: true }) sort: MatSort;

	async ngOnInit(): Promise<void> {
		this.id = this.route.snapshot.paramMap.get('id')!;

		await this.getLoan(this.id);
	}

	async getLoan(id: string): Promise<void> {
		const getLoanByIdResponse = await fetch(
			`${environment.serverUrl}/loans/${id}`
		);
		const getLoanByIdResult: ResultWrapper<GetLoanByIdResult> =
			await getLoanByIdResponse.json();

		this.updateLoanForm.patchValue({
			name: getLoanByIdResult.data.name,
			totalFunded: getLoanByIdResult.data.totalFunded,
			createdAt: getLoanByIdResult.data.createdAt,
			updatedAt: getLoanByIdResult.data.updatedAt,
		});
		this.paymentsDataSource =
			new MatTableDataSource<GetLoanByIdResultPaymentDTO>(
				getLoanByIdResult.data.payments
			);
		this.paymentsDataSource.sort = this.sort;
	}

	async updateLoan(): Promise<void> {
		const updateLoanRequest: UpdateLoanRequest = {
			name: this.updateLoanForm.value.name,
			totalFunded: this.updateLoanForm.value.totalFunded,
		};

		const updateLoanResponse = await fetch(
			`${environment.serverUrl}/loans/${this.id}`,
			{
				method: 'PUT',
				headers: headers,
				body: JSON.stringify(updateLoanRequest),
			}
		);

		const updateLoanResult: ResultWrapper<void> =
			await updateLoanResponse.json();

		console.log(updateLoanResult);
	}

	async deleteLoan(): Promise<void> {
		const deleteLoanResponse = await fetch(
			`${environment.serverUrl}/loans/${this.id}`,
			{
				method: 'DELETE',
			}
		);

		const deleteLoanResult: ResultWrapper<void> =
			await deleteLoanResponse.json();

		console.log(deleteLoanResult);
	}

	async removePayment(id: string): Promise<void> {
		const removePaymentResponse = await fetch(
			`${environment.serverUrl}/loans/payments/${id}`,
			{
				method: 'DELETE',
			}
		);

		const removePaymentResult: ResultWrapper<void> =
			await removePaymentResponse.json();

		console.log(removePaymentResult);
	}

	openAddPaymentDialog(): void {
		const dialogRef = this.dialog.open(AddPaymentDialogComponent, {
			data: this.id,
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('result', result);

			this.getLoan(this.id);
		});
	}

	openUpdatePaymentDialog(
		id: string,
		value: number,
		paid: boolean,
		expirationDate: Date
	): void {
		const dialogRef = this.dialog.open(UpdatePaymentDialogComponent, {
			data: {
				id: id,
				value: value,
				paid: paid,
				expirationDate: expirationDate,
			},
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('result', result);

			this.getLoan(this.id);
		});
	}

	get loan() {
		return this.updateLoanForm.controls;
	}
}
