import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
`;

const NavLink = styled.a<{ active: boolean }>`
  padding: 16px;

  color: white;

  background-color: ${(p) => (p.active ? '#444' : null)};

  &:visited {
    color: white;
  }

  &:hover {
    background-color: #555;
    text-decoration: none;
  }
`;

export function TopBar() {
  const router = useRouter();
  const activePeople = router.pathname.includes('people');
  const activeGames = router.pathname.includes('games');

  return (
    <Wrapper>
      <Link href="/people" passHref>
        <NavLink active={activePeople}>People</NavLink>
      </Link>
      <Link href="/games" passHref>
        <NavLink active={activeGames}>Games</NavLink>
      </Link>
    </Wrapper>
  );
}
