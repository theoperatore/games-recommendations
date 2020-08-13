import useSwr from 'swr';
import { Game, UserWithRelationship } from './response-types';

type GameDetailResponse = {
  game: Game;
  users: UserWithRelationship[];
};

export function useGame(gameId: string) {
  return useSwr<GameDetailResponse>(`/api/games/${gameId}`, async (url) => {
    const response = await fetch(url);

    if (!response.ok) {
      const msg = await response.json();
      console.error(msg);
      throw new Error(`Failed to fetch: ${msg.message}`);
    }

    return await response.json();
  });
}
