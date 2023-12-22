import { ListLoansResult } from '../types/loan/listLoansResult';
import { ResultWrapper } from '../types/resultWrapper';
import CreateLoanComponent from './CreateLoanComponent';

async function listLoans(): Promise<ResultWrapper<ListLoansResult[]>> {
  const listLoansResponse = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + '/loans'
  );

  return await listLoansResponse.json();
}

export default async function Page() {
  const listLoansResult = await listLoans();

  return (
    <>
      <CreateLoanComponent />
      <div>
        {listLoansResult.data.map((llr) => (
          <li key={llr.id}>
            {llr.id},{llr.name},{llr.value},{llr.createdAt.toString()}
          </li>
        ))}
      </div>
    </>
  );
}
