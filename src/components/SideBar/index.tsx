import React from 'react';
import { useRouter } from 'next/router';
import { useGames } from '../../data/useGames';
import Link from 'next/link';

function SideBarPeople() {
  return (
    <div className="p-3 flex-1">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">People</h2>
        <button className="btn-gray" disabled>
          add
        </button>
      </div>
    </div>
  );
}

function SideBarGames() {
  const { error, data } = useGames(100);
  const router = useRouter();
  const gameId = router.query.gameId as string;
  return (
    <div className="p-3 flex-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl">Games</h2>
        <button className="btn-gray" disabled>
          add
        </button>
      </div>
      {!error &&
        data &&
        data.games &&
        data.games.map((game) => {
          const isActive = gameId === game.id;
          const classNames = `block p-2 hover:bg-gray-500${
            isActive ? ' bg-gray-600' : ''
          }`;
          return (
            <div key={game.id}>
              <Link href="/games/[gameId]" as={`/games/${game.id}`} passHref>
                <a className={classNames}>{game.name}</a>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export function SideBar() {
  const router = useRouter();
  const isPeople = router.pathname.includes('people');
  const isGames = router.pathname.includes('games');

  if (isPeople) {
    return <SideBarPeople />;
  }

  if (isGames) {
    return <SideBarGames />;
  }

  return null;
}
