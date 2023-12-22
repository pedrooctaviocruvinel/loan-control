'use client';

import { CreateLoanRequest } from '@/types/loan/createLoanRequest';
import { FormEvent } from 'react';

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
        <input type='text' name='name' />
        <br />
        <input type='number' min='1' step='any' name='value' />
        <br />

        <button type='submit'>Submit</button>
      </form>
    </>
  );
}
