import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

const TopBar = styled.div`
  background-color: #333;
  border-bottom: 1px solid #444;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const SideBar = styled.div`
  display: flex;
  width: 300px;
  background-color: #333;
`;

const Content = styled.div`
  flex: 1;
  padding: 12px 24px;
`;

type Props = {
  topBar: React.ReactNode;
  sideBar: React.ReactNode;
  children: React.ReactNode;
};

export function Layout(props: Props) {
  return (
    <Wrapper>
      <TopBar>{props.topBar}</TopBar>
      <ContentWrapper>
        <SideBar>{props.sideBar}</SideBar>
        <Content>{props.children}</Content>
      </ContentWrapper>
    </Wrapper>
  );
}
