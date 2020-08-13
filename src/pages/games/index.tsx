import React from 'react';
import { useGames } from '../../data/useGames';

export default function Games() {
  return (
    <div>
      <h1 className="text-5xl">Games</h1>
      <p className="text-base">
        Select a game from the side bar to view specific details about it.
      </p>
    </div>
  );
}
