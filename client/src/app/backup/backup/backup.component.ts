import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

import { ErrorComponent } from '@/app/shared/components/error/error.component';
import { LoadingComponent } from '@/app/shared/components/loading/loading.component';
import { downloadFile } from '@/app/shared/file/download-file';
import { ResultWrapperModel } from '@/app/shared/models/result-wrapper.model';

import { BackupService } from '../services/backup.service';

@Component({
	selector: 'app-backup',
	standalone: true,
	imports: [
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		LoadingComponent,
		ErrorComponent,
	],
	templateUrl: './backup.component.html',
})
export class BackupComponent {
	constructor(
		private readonly backupService: BackupService,
		private readonly toastrService: ToastrService
	) {}

	loadingGenerateBackup: boolean = false;

	generateBackupErrorCode: number = 0;
	generateBackupErrors: string[] = [];

	generateBackupButtonDisabled: boolean = false;
	uploadBackupButtonDisabled: boolean = false;

	buttonsDisabled(status: boolean): void {
		this.generateBackupButtonDisabled = status;
		this.uploadBackupButtonDisabled = status;
	}

	loading(status: boolean): void {
		this.loadingGenerateBackup = status;
		this.buttonsDisabled(status);
	}

	async generateBackup(): Promise<void> {
		this.loading(true);

		const generateBackupResult = await this.backupService.generate();

		const generatedSuccessfully = generateBackupResult instanceof ArrayBuffer;

		this.loading(false);

		if (!generatedSuccessfully) {
			this.buttonsDisabled(true);

			const generateBackupErrorResult: ResultWrapperModel<void> =
				generateBackupResult;

			this.generateBackupErrorCode = generateBackupErrorResult.errorCode;
			this.generateBackupErrors = generateBackupErrorResult.errors;

			this.toastrService.error('Error on generate Backup', 'Generate Backup');
		} else {
			const file: ArrayBuffer = generateBackupResult;

			downloadFile(file, 'backup.json', 'application/json');

			this.toastrService.success(
				'Backup generated successfully',
				'Generate Backup'
			);
		}
	}
}
