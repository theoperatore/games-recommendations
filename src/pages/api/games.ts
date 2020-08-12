import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';

const URL = `${process.env.DB_ENDPOINT}/games`;

export default async function games(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).send('METHOD NOT SUPPORTED');
  const limit = req.query.limit || '';
  const offset = req.query.offset || '';

  const url = `${URL}?limit=${limit}&offset=${offset}`;
  try {
    const r = await fetch(url);
    const d = await r.json();
    res.json(d);
  } catch (error) {
    console.error(error);
    res.json({ message: error.message });
  }
}
