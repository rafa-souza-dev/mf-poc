import { revalidate } from '@module-federation/nextjs-mf/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await revalidate();
      res.status(200).json({ message: 'Revalidated' });
    } catch (error) {
      console.error('Error revalidating:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
