'use client';

import { FormEvent } from 'react';

import { CreateLoanRequest } from '@/types/loan/createLoanRequest';

async function onSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const createLoanRequest: CreateLoanRequest = {
    name: event.target.name.value,
    value: event.target.value.value,
  };

  const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/loans', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createLoanRequest),
  });

  const data = await response.json();
}

export default function CreateLoanComponent() {
  return (
    <>
      <form onSubmit={onSubmit}>
        <br />
        <input className='rounded-full px-4 py-3' type='text' name='name' />
        <br />
        <input type='number' min='1' step='any' name='value' />
        <br />
        <button className='... bg-sky-500 hover:bg-sky-700'>
          Save changes
        </button>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
}
