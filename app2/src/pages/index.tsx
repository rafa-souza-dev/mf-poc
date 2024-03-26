import React, { useEffect, useState } from 'react';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const Title = isClient ? require('next1/title').default : () => <div>Carregando...</div>;

  return (
    <>
      {isClient && <Title />}
      
      <br />
      <br />

      <button onClick={() => setNumber(number + 1)}>Soma 1</button>
      <p>{number}</p>
    </>
  );
}
