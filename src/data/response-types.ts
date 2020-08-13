export type User = {
  id: string;
  name: string;
};

export type Game = {
  id: string;
  name: string;
  gb_uuid?: string;
};

export type GameRelationship =
  | 'COMPLETE_100'
  | 'BEATEN'
  | 'SET_ASIDE_ENJOYED'
  | 'SET_ASIDE'
  | 'GOT_BORED'
  | 'WOULD_NOT_LIKE';

export type GameWithRelationship = {
  game: Game;
  relationship: GameRelationship;
};

export type UserWithRelationship = {
  user: User;
  relationship: GameRelationship;
};

export const VALID_RELATIONSHIPS = new Set<GameRelationship>([
  'COMPLETE_100',
  'BEATEN',
  'SET_ASIDE_ENJOYED',
  'SET_ASIDE',
  'GOT_BORED',
  'WOULD_NOT_LIKE',
]);
