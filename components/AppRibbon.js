/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const Wrapper = styled.div({
  background: 'blue',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBlock: 16,
  paddingInline: 24
});

const LeftSide = styled.div({
  display: 'flex'
});

function Logo() {
  return <img alt='logo' src='logo.svg' />;
}

export default function AppRibbon() {
  return (
    <Wrapper>
      <LeftSide>
        <Logo />
      </LeftSide>
    </Wrapper>
  );
}
