import { Injectable } from '@angular/core';

import { ResultWrapperModel } from '@/app/shared/models/result-wrapper.model';
import { environment } from '@/environments/environment';

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
}
