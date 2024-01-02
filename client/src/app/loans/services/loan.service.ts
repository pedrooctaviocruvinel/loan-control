import { Injectable } from '@angular/core';

import { headers } from '@/app/shared/http/headers';
import { ResultWrapperModel } from '@/app/shared/models/result-wrapper.model';
import { environment } from '@/environments/environment';

import { AddPaymentRequestDTO } from '../dtos/add-payment-request.dto';
import { CreateLoanRequestDTO } from '../dtos/create-loan-request.dto';
import { GetLoanByIdResultDTO } from '../dtos/get-loan-by-id-result.dto';
import { ListLoansResultDTO } from '../dtos/list-loans-result.dto';
import { UpdateLoanRequestDTO } from '../dtos/update-loan-request.dto';
import { UpdatePaymentRequestDTO } from '../dtos/update-payment-request.dto';

@Injectable({
	providedIn: 'root',
})
export class LoanService {
	async list(): Promise<ResultWrapperModel<ListLoansResultDTO[]>> {
		const listLoansResponse = await fetch(environment.serverUrl + '/loans');
		const listLoansResult = await listLoansResponse.json();

		return listLoansResult;
	}

	async getById(id: string): Promise<ResultWrapperModel<GetLoanByIdResultDTO>> {
		const getLoanByIdResponse = await fetch(
			`${environment.serverUrl}/loans/${id}`
		);
		const getLoanByIdResult: ResultWrapperModel<GetLoanByIdResultDTO> =
			await getLoanByIdResponse.json();

		return getLoanByIdResult;
	}

	async create(
		createLoanRequest: CreateLoanRequestDTO
	): Promise<ResultWrapperModel<void>> {
		const createLoanResponse = await fetch(environment.serverUrl + '/loans', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(createLoanRequest),
		});

		const createLoanResult = await createLoanResponse.json();

		return createLoanResult;
	}

	async update(
		id: string,
		updateLoanRequest: UpdateLoanRequestDTO
	): Promise<ResultWrapperModel<void>> {
		const updateLoanResponse = await fetch(
			`${environment.serverUrl}/loans/${id}`,
			{
				method: 'PUT',
				headers: headers,
				body: JSON.stringify(updateLoanRequest),
			}
		);

		const updateLoanResult: ResultWrapperModel<void> =
			await updateLoanResponse.json();

		return updateLoanResult;
	}

	async delete(id: string): Promise<ResultWrapperModel<void>> {
		const deleteLoanResponse = await fetch(
			`${environment.serverUrl}/loans/${id}`,
			{
				method: 'DELETE',
			}
		);

		const deleteLoanResult: ResultWrapperModel<void> =
			await deleteLoanResponse.json();

		return deleteLoanResult;
	}

	async addPayment(
		loanId: string,
		addPaymentRequest: AddPaymentRequestDTO
	): Promise<ResultWrapperModel<void>> {
		const addPaymentResponse = await fetch(
			`${environment.serverUrl}/loans/${loanId}/payments`,
			{
				method: 'POST',
				headers: headers,
				body: JSON.stringify(addPaymentRequest),
			}
		);

		const addPaymentResult: ResultWrapperModel<void> =
			await addPaymentResponse.json();

		return addPaymentResult;
	}

	async updatePayment(
		id: string,
		updatePaymentRequest: UpdatePaymentRequestDTO
	): Promise<ResultWrapperModel<void>> {
		const updatePaymentResponse = await fetch(
			`${environment.serverUrl}/loans/payments/${id}`,
			{
				method: 'PUT',
				headers: headers,
				body: JSON.stringify(updatePaymentRequest),
			}
		);

		const updatePaymentResult: ResultWrapperModel<void> =
			await updatePaymentResponse.json();

		return updatePaymentResult;
	}

	async removePayment(id: string): Promise<ResultWrapperModel<void>> {
		const removePaymentResponse = await fetch(
			`${environment.serverUrl}/loans/payments/${id}`,
			{
				method: 'DELETE',
			}
		);

		const removePaymentResult: ResultWrapperModel<void> =
			await removePaymentResponse.json();

		return removePaymentResult;
	}
}
