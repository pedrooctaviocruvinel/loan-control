import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private toastrService: ToastrService) {}

  show() {
    this.toastrService.warning('toastr body', 'toastr title');
    this.toastrService.success('toastr body', 'toastr title');
  }
}
