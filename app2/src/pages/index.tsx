import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const Title = dynamic(() => import('next1/title'), {
  ssr: false,
});

export default function Home() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <Title />
      
      <br />
      <br />

      <button onClick={() => setNumber(number + 1)}>Soma 1</button>
      <p>{number}</p>
    </>
  );
}
