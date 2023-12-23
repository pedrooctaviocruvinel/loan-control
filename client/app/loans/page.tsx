import moment from 'moment';

import { ListLoansResult } from '@/types/loan/listLoansResult';
import { ResultWrapper } from '@/types/resultWrapper';

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
    <div>
      <h1 className='text-6xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white'>
        Loans
      </h1>

      <div className='relative overflow-x-auto'>
        <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Value
              </th>
              <th scope='col' className='px-6 py-3'>
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {listLoansResult.data.map((llr) => (
              <tr
                className='border-b bg-white dark:border-gray-700 dark:bg-gray-800'
                key={llr.id}
              >
                <th
                  scope='row'
                  className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
                >
                  {llr.name}
                </th>
                <td className='px-6 py-4'>{llr.value}</td>
                <td className='px-6 py-4'>
                  {moment(llr.createdAt).format('MM/DD/YYYY HH:mm')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateLoanComponent />
    </div>
  );
}
