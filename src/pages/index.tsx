import Head from 'next/head';
import useSwr from 'swr';

type Game = {
  id: string;
  name: string;
};

type GamesResponse = {
  total: string;
  limit: number;
  offset: number;
  games: Game[];
};

function useGames(limit: number = 25, offset: number = 0) {
  return useSwr<GamesResponse>(
    `/api/games?limit=${limit}&offset=${offset}`,
    (url) => fetch(url).then((r) => r.json()),
  );
}

export default function Home() {
  const { data, isValidating } = useGames(100, 0);
  return (
    <div>
      <Head>
        <title>Game Recommendations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {isValidating && !data && <p>loading...</p>}
        {data &&
          data.games.map((game) => {
            return (
              <div key={game.id}>
                <p>{game.name}</p>
              </div>
            );
          })}
      </main>
    </div>
  );
}
