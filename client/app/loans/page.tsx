import moment from 'moment';

import { CardComponent } from '@/components/CardComponent';
import { ListLoansResult } from '@/types/loan/listLoansResult';
import { ResultWrapper } from '@/types/resultWrapper';

import CreateLoanComponent from './CreateLoanComponent';

async function listLoans(): Promise<ResultWrapper<ListLoansResult[]>> {
  const listLoansResponse = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + '/loans'
  );

  return await listLoansResponse.json();
}

async function LoansListComponent() {
  const listLoansResult = await listLoans();

  return (
    <CardComponent title='List of Loans'>
      <div className='overflow-x-auto'>
        <table className='w-full text-left'>
          <thead className='text-sm font-bold uppercase text-gray-700'>
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
              <th scope='col' className='px-6 py-3'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {listLoansResult.data.map((llr) => (
              <tr className='border-t font-light text-gray-600' key={llr.id}>
                <td scope='row' className='px-6 py-4 font-medium'>
                  {llr.name}
                </td>
                <td className='px-6 py-4'>
                  {llr.value.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>
                <td className='px-6 py-4'>
                  {moment(llr.createdAt).format('MM/DD/YYYY HH:mm')}
                </td>
                <td className='px-6 py-4'>
                  <div className='lg:flex lg:flex-row'>
                    <div className='w-full lg:mr-4'>
                      <button className='w-full rounded-lg bg-emerald-500 p-2 font-medium text-white hover:bg-emerald-700 hover:text-gray-100'>
                        View
                      </button>
                    </div>
                    <div className='w-full max-lg:mt-4 lg:mr-4'>
                      <button className='w-full rounded-lg bg-emerald-500 p-2 font-medium text-white hover:bg-emerald-700 hover:text-gray-100'>
                        Edit
                      </button>
                    </div>
                    <div className='w-full max-lg:mt-4'>
                      <button className='w-full rounded-lg bg-emerald-500 p-2 font-medium text-white hover:bg-emerald-700 hover:text-gray-100'>
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CardComponent>
  );
}

export default async function Page() {
  return (
    <div>
      <LoansListComponent />
      <CreateLoanComponent />
    </div>
  );
}
