import React, { useCallback } from 'react';

export default function RevalidateComponent() {
  const handleRevalidate = useCallback(async () => {
    try {
      const response = await fetch('/api/revalidate', { method: 'POST' });
      if (response.ok) {
        console.log('Revalidation successful');
      } else {
        console.error('Failed to revalidate:', response.statusText);
      }
    } catch (error) {
      console.error('Error revalidating:', error);
    }
  }, []);

  return (
    <div>
      <h1>Componente Revalidar</h1>
      <button onClick={handleRevalidate}>Revalidate</button>
    </div>
  );
};
