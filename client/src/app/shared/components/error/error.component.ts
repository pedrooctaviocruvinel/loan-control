import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-error',
	standalone: true,
	imports: [],
	templateUrl: './error.component.html',
})
export class ErrorComponent {
	@Input() title: string = 'Unexpected Error';
	@Input() errors: string[] = [];
}
