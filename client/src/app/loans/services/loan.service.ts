import { Injectable } from '@angular/core';

import { ResultWrapperModel } from '@/app/shared/models/result-wrapper.model';
import { environment } from '@/environments/environment';

import { ListLoansResultDTO } from '../dtos/list-loans-result.dto';

@Injectable({
	providedIn: 'root',
})
export class LoanService {
	async list(): Promise<ResultWrapperModel<ListLoansResultDTO[]>> {
		const listLoansResponse = await fetch(environment.serverUrl + '/loans');
		const listLoansResult = await listLoansResponse.json();

		return listLoansResult;
	}
}
