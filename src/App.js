import React, { useState } from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { useQuery } from 'react-query';

export default function App() {
  return (
    <>
      <Exchange />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

const fetchExchange = async (currency) => {
  const response = await fetch(` https://api.ratesapi.io/api/latest?base=${currency}`);
  const data = await response.json();
  return data;
}

function Exchange() {
  const [currency, setCurrency] = useState('HRK');
  const {status, data, error} = useQuery(currency, fetchExchange);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>error: {JSON.stringify(error)}</div>

  return (
    <div>
      <button onClick={() => setCurrency('HRK')}>HRK</button>
      <button onClick={() => setCurrency('USD')}>USD</button>
      <button onClick={() => setCurrency('EUR')}>EUR</button>
      <h2>Showing currency: {currency}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}