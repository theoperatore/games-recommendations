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

export function useGames(limit: number = 25, offset: number = 0) {
  return useSwr<GamesResponse>(
    `/api/games?limit=${limit}&offset=${offset}`,
    (url) => fetch(url).then((r) => r.json()),
  );
}
