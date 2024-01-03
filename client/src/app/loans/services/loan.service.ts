import { Injectable } from '@angular/core';

import { headers } from '@/app/shared/http/headers';
import { ResultWrapperModel } from '@/app/shared/models/result-wrapper.model';
import { environment } from '@/environments/environment';

import { CreateLoanRequestDTO } from '../dtos/create-loan-request.dto';
import { ListLoansResultDTO } from '../dtos/list-loans-result.dto';

@Injectable({
	providedIn: 'root',
})
export class LoanService {
	async list(): Promise<ResultWrapperModel<ListLoansResultDTO[]>> {
		const listLoansResponse = await fetch(environment.serverUrl + '/loans');

		return await listLoansResponse.json();
	}

	async create(
		createLoanRequest: CreateLoanRequestDTO
	): Promise<ResultWrapperModel<void>> {
		const createLoanResponse = await fetch(environment.serverUrl + '/loans', {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(createLoanRequest),
		});

		return await createLoanResponse.json();
	}
}
