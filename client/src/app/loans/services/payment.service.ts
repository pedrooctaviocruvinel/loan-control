import { Injectable } from '@angular/core';

import { headers } from '@/app/shared/http/headers';
import { ResultWrapperModel } from '@/app/shared/models/result-wrapper.model';
import { environment } from '@/environments/environment';

import { AddPaymentRequestDTO } from '../dtos/add-payment-request.dto';
import { UpdatePaymentRequest } from '../dtos/update-payment-request.dto';

@Injectable({
	providedIn: 'root',
})
export class PaymentService {
	async add(
		loanId: string,
		request: AddPaymentRequestDTO
	): Promise<ResultWrapperModel<void>> {
		const addPaymentResponse = await fetch(
			`${environment.serverUrl}/loans/${loanId}/payments`,
			{
				method: 'POST',
				headers: headers,
				body: JSON.stringify(request),
			}
		);

		return await addPaymentResponse.json();
	}

	async update(
		id: string,
		request: UpdatePaymentRequest
	): Promise<ResultWrapperModel<void>> {
		const updatePaymentResponse = await fetch(
			`${environment.serverUrl}/loans/payments/${id}`,
			{
				method: 'PUT',
				headers: headers,
				body: JSON.stringify(request),
			}
		);

		return await updatePaymentResponse.json();
	}

	async remove(id: string): Promise<ResultWrapperModel<void>> {
		const deleteLoanResponse = await fetch(
			`${environment.serverUrl}/loans/payments/${id}`,
			{
				method: 'DELETE',
			}
		);

		return await deleteLoanResponse.json();
	}
}
