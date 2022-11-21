/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography, IconButton, Button } from '@mui/material';
import { SortDesc as SortDescIcon } from '@styled-icons/octicons/SortDesc';
import PhenoIcon from './PhenoIcon';

const Wrapper = styled.div({
  background: 'blue',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 60,
  paddingInline: 24,
  background:
    'radial-gradient(92.96% 236.49% at 21.11% -12.32%, #2E04E3 0%, #612095 100%)',
  boxSizing: 'border-box',
  gap: 24,
  zIndex: 1,
  position: 'relative'
});

const LeftSide = styled.div({
  display: 'flex',
  gap: 16,
  width: '100%'
});

const RightSide = styled.div({
  display: 'flex',
  gap: 16,
  alignItems: 'center'
});

const ButtonGroupWrapper = styled.div({
  display: 'flex',
  borderRadius: 20,
  overflow: 'hidden',
  height: 40,
  gap: 2
});

const buttonStyle = {
  color: '#FFF',
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  height: '100%',
  paddingInline: 24,
  borderRadius: 0,
  background: 'rgba(255, 255, 255, 0.1)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)'
  }
};

const selected = {
  color: '#000',
  background: 'rgba(255, 255, 255, 1)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 1)'
  }
};

const counterStyle = {
  transform: 'translateY(0.5px)',
  whiteSpace: 'nowrap'
};

function Logo() {
  return <img alt='logo' src='logo.svg' />;
}

function Filter() {
  return (
    <input
      type='text'
      placeholder='Filter by keywords (comma separated)'
      css={{
        borderRadius: 20,
        border: 'none',
        height: 40,
        width: '100%',
        maxWidth: 543,
        paddingInline: 20,
        fontFamily: 'Roboto',
        fontSize: 18,
        outline: 'none',
        boxSizing: 'border-box',
        '&::placeholder': {
          color: 'rgba(0, 0, 0, 0.2)',
          fontStyle: 'italic'
        },
        '&::focus': {
          border: 'none'
        }
      }}
    />
  );
}

function SortDirection() {
  return (
    <IconButton
      data-tip='Revers order'
      size='large'
      css={{
        color: '#FFF'
      }}
    >
      <SortDescIcon size={24} />
    </IconButton>
  );
}

function SortBy() {
  return (
    <ButtonGroupWrapper>
      <Button css={[buttonStyle, selected]} data-tip='Sort alphabetically'>
        <Typography
          css={[
            counterStyle,
            {
              fontSize: 18,
              fontWeight: 100
            }
          ]}
        >
          A-Z
        </Typography>
        <Typography css={counterStyle}>36</Typography>
      </Button>
      <Button css={buttonStyle} data-tip='Sort by participants'>
        <PhenoIcon name='user' scale={1.2} />{' '}
        <Typography css={counterStyle}>36</Typography>
      </Button>
      <Button css={buttonStyle} data-tip='Sort by measurements'>
        <PhenoIcon name='meter' scale={1.2} />{' '}
        <Typography css={counterStyle}>36</Typography>
      </Button>
      <Button css={buttonStyle} data-tip='Sort by cohorts'>
        <PhenoIcon name='group' scale={1.2} />
        {/* <GroupIcon size={28} /> */}
        <Typography css={counterStyle}>36</Typography>
      </Button>
    </ButtonGroupWrapper>
  );
}

export default function AppRibbon() {
  return (
    <Wrapper>
      <LeftSide>
        <Logo />
        <Filter />
      </LeftSide>
      <RightSide>
        <SortBy />
        <SortDirection />
      </RightSide>
    </Wrapper>
  );
}
