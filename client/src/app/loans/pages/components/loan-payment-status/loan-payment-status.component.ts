import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { LoadingComponent } from '@/app/shared/components/loading/loading.component';

@Component({
	selector: 'app-loan-payment-status',
	standalone: true,
	imports: [MatCardModule, LoadingComponent],
	templateUrl: './loan-payment-status.component.html',
})
export class LoanPaymentStatusComponent {
	@Input() title: string;
	@Input() loading: boolean;
	@Input() error: boolean;
	@Input() value: string;
	@Input() valueColor: string = 'text-dark';
}
