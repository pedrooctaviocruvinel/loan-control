import { CommonModule, registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { Component, DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterOutlet } from '@angular/router';

registerLocaleData(ptBr);

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, MatNativeDateModule],
	providers: [
		{ provide: LOCALE_ID, useValue: 'pt' },
		{ provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
	],
	templateUrl: './app.component.html',
})
export class AppComponent {}
