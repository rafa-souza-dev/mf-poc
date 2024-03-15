import { lazy } from 'react';

export default function Home() {
  const Title = lazy(() => import('next1/title'));
  const Button = lazy(() => import('next1/button'));

  return (
    <>
      <Title />
      <Button />
    </>
  )
}
