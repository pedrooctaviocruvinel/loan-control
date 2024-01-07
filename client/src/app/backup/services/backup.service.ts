import { Injectable } from '@angular/core';

import { headers } from '@/app/shared/http/headers';
import { ResultWrapperModel } from '@/app/shared/models/result-wrapper.model';
import { environment } from '@/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class BackupService {
	async generate(): Promise<ResultWrapperModel<void> | ArrayBuffer> {
		const generateBackupResponse = await fetch(
			environment.serverUrl + '/backup/generate',
			{
				method: 'POST',
				headers: headers,
			}
		);

		if (generateBackupResponse.status != 200) {
			const generateBackupResult: ResultWrapperModel<void> =
				await generateBackupResponse.json();

			return generateBackupResult;
		}

		return await generateBackupResponse.arrayBuffer();
	}

	async execute(file: File): Promise<ResultWrapperModel<void>> {
		const formData = new FormData();
		formData.append('file', file, 'backup.json');

		const executeBackupResponse = await fetch(
			environment.serverUrl + '/backup/execute',
			{
				method: 'POST',
				body: formData,
			}
		);

		return await executeBackupResponse.json();
	}
}
