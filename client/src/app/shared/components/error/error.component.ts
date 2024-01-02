import { Component, Input } from '@angular/core';

import { EErrorImageCode } from '../../enums/error-image-code.enum';

@Component({
	selector: 'app-error',
	standalone: true,
	templateUrl: './error.component.html',
})
export class ErrorComponent {
	@Input() errors: string[] = [];
	@Input() title: string = 'Unexpected Error';
	@Input() errorImageCode: EErrorImageCode = EErrorImageCode.UnexpectedError;

	errorImagea: string = 'unexpected-error.png';

	get errorImage(): string {
		const imagePath = 'assets/images/';

		if (this.errorImageCode == EErrorImageCode.UnexpectedError)
			return imagePath + 'unexpected-error.png';

		return imagePath + 'unexpected-error.png';
	}
}
