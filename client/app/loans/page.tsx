import { ListLoansResult } from '../types/loan/listLoansResult';
import { ResultWrapper } from '../types/resultWrapper';

async function listLoans(): Promise<ResultWrapper<ListLoansResult[]>> {
  const listLoansResponse = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + '/loans'
  );

  return await listLoansResponse.json();
}

export default async function Page() {
  const listLoansResult = await listLoans();

  return (
    <div>
      {listLoansResult.data.map((llr) => (
        <li>
          {llr.id},{llr.name},{llr.value},{llr.createdAt.toString()}
        </li>
      ))}
    </div>
  );
}
