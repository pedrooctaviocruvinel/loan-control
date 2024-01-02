import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet, MatButtonModule],
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
