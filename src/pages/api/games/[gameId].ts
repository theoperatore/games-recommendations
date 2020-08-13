import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';

const URL = `${process.env.DB_ENDPOINT}/games`;

export default async function gameDetails(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // cors?
  if (req.method !== 'GET') return res.status(405).send('METHOD NOT SUPPORTED');
  const gameId = req.query.gameId || '';

  if (!gameId)
    return res.status(400).json({ message: 'missing required gameId' });

  const url = `${URL}/${gameId}`;
  try {
    const r = await fetch(url);
    const d = await r.json();
    res.json(d);
  } catch (error) {
    console.error(error);
    res.json({ message: error.message });
  }
}
