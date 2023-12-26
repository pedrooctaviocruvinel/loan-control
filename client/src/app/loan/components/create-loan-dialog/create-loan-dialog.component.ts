import { Component, Inject } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DialogResult } from '../../../../shared/types/dialogResult';

type CreateLoanRequest = {
	name: string;
	value: number;
};

@Component({
	selector: 'app-create-loan-dialog',
	standalone: true,
	imports: [
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatButtonModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatDialogClose,
		ReactiveFormsModule,
	],
	templateUrl: './create-loan-dialog.component.html',
})
export class CreateLoanDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<CreateLoanDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public dialogResult: DialogResult,
		public formBuilder: FormBuilder
	) {}

	createLoanForm: FormGroup = this.formBuilder.group({
		name: ['', [Validators.required, Validators.maxLength(25)]],
		value: ['', [Validators.required]],
	});

	async createLoan(): Promise<void> {
		const createLoanRequest: CreateLoanRequest = {
			name: this.createLoanForm.value.name,
			value: this.createLoanForm.value.value,
		};

		console.log('createLoanRequest', createLoanRequest);

		this.dialogResult = {
			success: true,
			errors: ['unexpected error'],
		};

		this.dialogRef.close(this.dialogResult);
	}

	get name() {
		return this.createLoanForm.get('name');
	}

	get value() {
		return this.createLoanForm.get('value');
	}
}
