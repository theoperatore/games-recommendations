import React from 'react';
import { useRouter } from 'next/router';
import { useGame } from '../../data/useGame';

export default function GameDetails() {
  const router = useRouter();
  const gameId = router.query.gameId as string;
  const { data, error } = useGame(gameId);

  if (!data) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <span>Error: {error}</span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-5xl">{data.game.name}</h1>
      <table>
        <thead>
          <tr>
            <th>Person</th>
            <th>Relationship</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map((user) => (
            <tr key={user.user.id}>
              <td>{user.user.name}</td>
              <td>{user.relationship}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
