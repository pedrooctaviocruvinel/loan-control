import { Injectable } from '@angular/core';

import { headers } from '@/app/shared/http/headers';
import { ResultWrapperModel } from '@/app/shared/models/result-wrapper.model';
import { environment } from '@/environments/environment';

import { CreateLoanRequestDTO } from '../dtos/create-loan-request.dto';
import { GetLoanByIdResultDTO } from '../dtos/get-loan-by-id-result.dto';
import { ListLoansResultDTO } from '../dtos/list-loans-result.dto';
import { UpdateLoanRequestDTO } from '../dtos/update-loan-request.dto';

@Injectable({
	providedIn: 'root',
})
export class LoanService {
	async list(): Promise<ResultWrapperModel<ListLoansResultDTO[]>> {
		const listLoansResponse = await fetch(environment.serverUrl + '/loans');

		return await listLoansResponse.json();
	}

	async getById(id: string): Promise<ResultWrapperModel<GetLoanByIdResultDTO>> {
		const getLoanByIdResponse = await fetch(
			`${environment.serverUrl}/loans/${id}`
		);

		return await getLoanByIdResponse.json();
	}

	async create(
		request: CreateLoanRequestDTO
	): Promise<ResultWrapperModel<void>> {
		const createLoanResponse = await fetch(environment.serverUrl + '/loans', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(request),
		});

		return await createLoanResponse.json();
	}

	async update(
		id: string,
		request: UpdateLoanRequestDTO
	): Promise<ResultWrapperModel<void>> {
		const updateLoanResponse = await fetch(
			`${environment.serverUrl}/loans/${id}`,
			{
				method: 'PUT',
				headers: headers,
				body: JSON.stringify(request),
			}
		);

		return await updateLoanResponse.json();
	}

	async delete(id: string): Promise<ResultWrapperModel<void>> {
		const deleteLoanResponse = await fetch(
			`${environment.serverUrl}/loans/${id}`,
			{
				method: 'DELETE',
			}
		);

		return await deleteLoanResponse.json();
	}
}
