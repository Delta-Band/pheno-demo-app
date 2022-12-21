/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import { Button, useMediaQuery, styled } from '@mui/material';
import { SortDesc as SortDescIcon } from '@styled-icons/octicons/SortDesc';
import { SortAsc as SortAscIcon } from '@styled-icons/octicons/SortAsc';
import Tooltip from './Tooltip';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Breadcrumbs, Sorter } from './pages/app-ribbon';

const LeftSide = styled('div')({
  display: 'flex',
  gap: 16,
  width: '100%'
});

const RightSide = styled('div')({
  display: 'flex',
  gap: 16,
  alignItems: 'center'
});

function Logo() {
  const router = useRouter();
  return (
    <img
      alt='logo'
      src='/logo.svg'
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
  const theme = useTheme();

  function handleFilterChange(value) {
    router.push({
      pathname: router.route,
      query: {
        folderID: router.query.folderID || '',
        filter: encodeURIComponent(value),
        sorter: router.query.sorter || 'participants',
        direction: router.query.direction || 'desc'
      }
    });
  }
  const disabled = !['/', '/folder/[folderID]'].includes(router.route);
  return (
    <motion.input
      type='Typography'
      placeholder='Filter by keywords (comma separated)'
      onChange={e => handleFilterChange(e.target.value)}
      value={decodeURIComponent(router.query.filter || '')}
      animate={{
        opacity: disabled ? 0.3 : 1
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 30
      }}
      css={theme => ({
        borderRadius: 20,
        border: 'none',
        height: 40,
        width: '100%',
        paddingInline: 20,
        fontFamily: 'Roboto',
        fontSize: 18,
        outline: 'none',
        boxSizing: 'border-box',
        color: '#000',
        background: '#FFF',
        boxShadow: theme.shadows.input,
        pointerEvents: disabled ? 'none' : 'all',
        '&::placeholder': {
          color: 'rgba(0, 0, 0, 0.2)',
          fontStyle: 'italic'
        },
        '&::focus': {
          border: 'none'
        },
        [theme.breakpoints.up('tablet')]: {
          maxWidth: 543
        }
      })}
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
        <Button
          css={{
            color: '#FFF',
            minWidth: 'unset',
            opacity:
              router.route === '/folder/[folderID]/field/[fieldID]' ? 0.3 : 1,
            pointerEvents:
              router.route === '/folder/[folderID]/field/[fieldID]'
                ? 'none'
                : 'all'
          }}
          onClick={() => {
            router.push({
              pathname: router.asPath.split('?')[0],
              query: {
                filter: router.query.filter || '',
                sorter: router.query.sorter || 'participants',
                direction: router.query.direction === 'desc' ? 'asc' : 'desc'
              }
            });
          }}
        >
          {router.query.direction === 'desc' ? (
            <SortDescIcon size={28} color='#FFFFFF' />
          ) : (
            <SortAscIcon size={28} color='#FFFFFF' />
          )}
        </Button>
      </motion.div>
    </Tooltip>
  );
}

function AnimatedContainer({ children, upTablet }) {
  const router = useRouter();
  const minimizeRibbon = useSelector(state => state.layout.minimizeRibbon);
  const prevRoute = useSelector(state => state.router.prevRoute);

  function getHeight() {
    switch (true) {
      case minimizeRibbon && upTablet:
      case upTablet && router.route === '/':
        return 70;
      case minimizeRibbon && !upTablet:
        return 58;
      case upTablet && router.route !== '/':
        return 122;
      case !upTablet && router.route === '/':
        return 170;
      case !upTablet && router.route !== '/':
        return 222;
    }
  }

  function getInitialHeight() {
    switch (true) {
      case minimizeRibbon:
      case upTablet && prevRoute === '/':
        return 70;
      case upTablet && prevRoute !== '/':
        return 122;
      case !upTablet && prevRoute === '/':
        return 170;
      case !upTablet && prevRoute !== '/':
        return 222;
    }
  }

  return (
    <motion.div
      initial={{
        height: getInitialHeight(),
        boxSizing: 'border-box'
      }}
      animate={{ height: getHeight() }}
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

const Wrapper = styled('div')({
  width: '100%',
  // background:
  //   'radial-gradient(92.96% 236.49% at 21.11% -12.32%, #2E04E3 0%, #612095 100%)',
  background:
    '-webkit-radial-gradient(right bottom, rgb(83 103 182) 0%, rgb(31 50 106) 100%)',
  boxSizing: 'border-box',
  zIndex: 1,
  position: 'relative',
  zIndex: 2
});

const FirstRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 58,
  paddingInline: 24,
  gap: 24,
  boxSizing: 'border-box',
  [theme.breakpoints.up('tablet')]: {
    paddingInlineEnd: 18,
    height: 70
  }
}));

const SecondRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingInlineStart: 24,
  paddingInlineEnd: 24,
  gap: 24,
  boxSizing: 'border-box',
  marginBottom: 16
});

export default function AppRibbon() {
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));

  return (
    <Wrapper>
      <AnimatedContainer upTablet={upTablet}>
        <FirstRow>
          <LeftSide>
            <Logo />
            {upTablet ? <Filter /> : null}
          </LeftSide>
          {upTablet ? (
            <RightSide>
              <Sorter />
              <SortDirection />
            </RightSide>
          ) : null}
        </FirstRow>
        {!upTablet ? (
          <>
            <SecondRow>
              <Filter />
            </SecondRow>
            <SecondRow>
              <Sorter />
              {/* <SortDirection /> */}
            </SecondRow>
          </>
        ) : null}
        <Breadcrumbs upTablet={upTablet} />
      </AnimatedContainer>
    </Wrapper>
  );
}
