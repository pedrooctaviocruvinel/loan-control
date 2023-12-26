import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import {
	Component,
	DEFAULT_CURRENCY_CODE,
	LOCALE_ID,
	OnInit,
	ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { ResultWrapper } from '../../shared/types/resultWrapper';
import { ListLoansResult } from './listLoansResult';

registerLocaleData(ptBr);

@Component({
	selector: 'app-loan',
	standalone: true,
	imports: [MatButtonModule, MatTableModule, CommonModule, MatSortModule],
	providers: [
		{ provide: LOCALE_ID, useValue: 'pt' },
		{ provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
	],
	templateUrl: './loan.component.html',
})
export class LoanComponent implements OnInit {
	async ngOnInit(): Promise<void> {
		await this.listLoans();
	}

	public loansDataSource = new MatTableDataSource<ListLoansResult>();
	loansDataSourceColumns = ['name', 'value', 'createdAt'];

	@ViewChild(MatSort) sort: MatSort;

	async listLoans(): Promise<void> {
		const listLoansResponse = await fetch('https://localhost:49368/api/Loans');
		const listLoansResult: ResultWrapper<ListLoansResult[]> =
			await listLoansResponse.json();

		this.loansDataSource = new MatTableDataSource<ListLoansResult>(
			listLoansResult.data
		);
		this.loansDataSource.sort = this.sort;
	}
}
