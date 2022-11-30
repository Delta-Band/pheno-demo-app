/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';
import { SortDesc as SortDescIcon } from '@styled-icons/octicons/SortDesc';
import { SortAsc as SortAscIcon } from '@styled-icons/octicons/SortAsc';
import PhenoIcon from './PhenoIcon';
import Tooltip from './Tooltip';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { fieldsSlice } from '../redux';
import { useSelector } from 'react-redux';

const Wrapper = styled.div({
  background: 'blue',
  width: '100%',
  // background:
  //   'radial-gradient(92.96% 236.49% at 21.11% -12.32%, #2E04E3 0%, #612095 100%)',
  background:
    'radial-gradient(87.96% 244.49% at 0 2.68%, rgb(164 182 192) 35%, rgb(115 131 141) 100%)',
  boxSizing: 'border-box',
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
  height: 40,
  gap: 2
});

const Breadcrumbs = styled.div({
  height: 60,
  width: '100%'
  // background: 'red'
});

const TopRow = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 60,
  paddingInline: 24,
  paddingInlineEnd: 16,
  gap: 24,
  boxSizing: 'border-box'
});

const buttonStyle = {
  color: '#FFF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 18,
  height: '100%',
  width: '9vw',
  paddingInline: 24,
  borderRadius: 0,
  minWidth: 'min-content',
  maxWidth: 200,
  boxSizing: 'border-box',
  background: 'rgba(255, 255, 255, 0.1)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)'
  }
};

const selected = {
  color: '#000',
  background: 'rgba(255, 255, 255, 1)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 1)'
  },
  '& svg': {
    fill: '#000'
  }
};

const counterStyle = {
  transform: 'translateY(0.5px)',
  whiteSpace: 'nowrap',
  color: 'inherit'
};

function Logo() {
  const router = useRouter();
  return (
    <img
      alt='logo'
      src='logo.svg'
      css={{
        cursor: 'pointer'
      }}
      onClick={() => {
        router.push({
          pathname: '/',
          query: {
            filter: router.query.filter || '',
            sorter: router.query.sorter || 'participants',
            direction: router.query.direction || 'desc'
          }
        });
      }}
    />
  );
}

function Filter() {
  const router = useRouter();

  function handleFilterChange(value) {
    router.push({
      pathname: router.route,
      query: {
        folder: router.query.folder || '',
        filter: encodeURIComponent(value),
        sorter: router.query.sorter || 'participants',
        direction: router.query.direction || 'desc'
      }
    });
  }

  return (
    <input
      type='Typography'
      placeholder='Filter by keywords (comma separated)'
      onChange={e => handleFilterChange(e.target.value)}
      value={decodeURIComponent(router.query.filter || '')}
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
        color: '#000',
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
  const router = useRouter();

  return (
    <Tooltip content={'Reverse Order'}>
      <motion.div
        animate={{
          rotateY: router.query.direction === 'asc' ? 180 : 0
        }}
      >
        <IconButton
          onClick={() => {
            router.push({
              pathname: router.route,
              query: {
                folder: router.query.folder || '',
                filter: router.query.filter || '',
                sorter: router.query.sorter || 'participants',
                direction: router.query.direction === 'desc' ? 'asc' : 'desc'
              }
            });
          }}
        >
          {router.query.direction === 'desc' ? (
            <SortDescIcon size={24} color='#FFFFFF' />
          ) : (
            <SortAscIcon size={24} color='#FFFFFF' />
          )}
        </IconButton>
      </motion.div>
    </Tooltip>
  );
}

function Sorter() {
  const router = useRouter();
  const totals = useSelector(state =>
    fieldsSlice.selectors.totals(state, {
      folder: router.query.folder,
      filter: router.query.filter,
      sorter: router.query.sorter,
      direction: router.query.direction
    })
  );

  function updateURL(sorter) {
    router.push({
      pathname: router.route,
      query: {
        folder: router.query.folder || '',
        filter: router.query.filter || '',
        sorter,
        direction: router.query.direction || 'desc'
      }
    });
  }

  return (
    <ButtonGroupWrapper>
      <Tooltip content={'Sort by participants'}>
        <Button
          onClick={() => {
            updateURL('participants');
          }}
          css={[
            buttonStyle,
            router.query.sorter === 'participants' ? selected : {},
            {
              borderStartStartRadius: 999,
              borderEndStartRadius: 999
            }
          ]}
        >
          <PhenoIcon
            name='user'
            scale={1.2}
            color={router.query.sorter === 'participants' ? undefined : '#FFF'}
          />{' '}
          <Typography css={counterStyle}>{totals.participants}</Typography>
        </Button>
      </Tooltip>
      <Tooltip content={'Sort by measurements'}>
        <Button
          onClick={() => {
            updateURL('measurements');
          }}
          css={[
            buttonStyle,
            router.query.sorter === 'measurements' ? selected : {}
          ]}
        >
          <PhenoIcon
            name='meter'
            scale={1.2}
            color={router.query.sorter === 'measurements' ? undefined : '#FFF'}
          />{' '}
          <Typography css={counterStyle}>{totals.measurements}</Typography>
        </Button>
      </Tooltip>
      <Tooltip content={'Sort by cohorts'}>
        <Button
          onClick={() => {
            updateURL('cohorts');
          }}
          css={[
            buttonStyle,
            router.query.sorter === 'cohorts' ? selected : {},
            {
              borderEndEndRadius: 999,
              borderStartEndRadius: 999
            }
          ]}
        >
          <PhenoIcon
            name='group'
            scale={1.2}
            color={router.query.sorter === 'cohorts' ? undefined : '#FFF'}
          />
          {/* <GroupIcon size={28} /> */}
          <Typography css={counterStyle}>{totals.cohorts.length}</Typography>
        </Button>
      </Tooltip>
    </ButtonGroupWrapper>
  );
}

function AnimatedContainer({ children }) {
  const router = useRouter();
  return (
    <motion.div
      initial={{
        height: 60
      }}
      animate={{
        height: router.route === '/' ? 60 : 120
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 30
      }}
      css={{
        width: '100%',
        overflow: 'hidden'
      }}
    >
      {children}
    </motion.div>
  );
}

export default function AppRibbon() {
  return (
    <Wrapper>
      <AnimatedContainer>
        <TopRow>
          <LeftSide>
            <Logo />
            <Filter />
          </LeftSide>
          <RightSide>
            <Sorter />
            <SortDirection />
          </RightSide>
        </TopRow>
        <Breadcrumbs />
      </AnimatedContainer>
    </Wrapper>
  );
}
