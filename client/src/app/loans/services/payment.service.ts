import { Injectable } from '@angular/core';

import { headers } from '@/app/shared/http/headers';
import { ResultWrapperModel } from '@/app/shared/models/result-wrapper.model';
import { environment } from '@/environments/environment';

import { UpdatePaymentRequest } from '../dtos/update-payment-request.dto';

@Injectable({
	providedIn: 'root',
})
export class PaymentService {
	async remove(id: string): Promise<ResultWrapperModel<void>> {
		const deleteLoanResponse = await fetch(
			`${environment.serverUrl}/loans/payments/${id}`,
			{
				method: 'DELETE',
			}
		);

		return await deleteLoanResponse.json();
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
}
