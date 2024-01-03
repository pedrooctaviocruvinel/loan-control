import { CommonModule, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { Component, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

registerLocaleData(ptBr);

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, MatButtonModule],
	providers: [
		{ provide: LOCALE_ID, useValue: 'pt' },
		{ provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
	],
	templateUrl: './app.component.html',
})
export class AppComponent {
	constructor(private toastrService: ToastrService) {}

	show(): void {}

	test(id: string): number {
		console.log(id);

		return 25;
	}
}
