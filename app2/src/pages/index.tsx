import { UseQueryResult } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import React, { ComponentType, useState } from 'react';

let Title: ComponentType<{}> = () => <div />;
let useDitto: () => UseQueryResult<any, Error> = () => ({ data: null });

if (typeof window !== 'undefined') {
  import('next1/useDitto')
    .then(module => { useDitto = module.default })

  Title = dynamic(() => import('next1/title'), {
    ssr: false,
    loading: () => <div></div>
  });
}

export default function Home() {
  const [number, setNumber] = useState(0);
  const { data } = useDitto();

  return (
    <>
      <Title />
      
      <br />
      <br />

      <p>{data?.weight}</p>

      <button onClick={() => setNumber(number + 1)}>Soma 1</button>
      <p>{number}</p>
    </>
  );
}
