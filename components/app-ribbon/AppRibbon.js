/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, useMediaQuery, styled, getOffsetLeft } from '@mui/material';
import { SortDesc as SortDescIcon } from '@styled-icons/octicons/SortDesc';
import { SortAsc as SortAscIcon } from '@styled-icons/octicons/SortAsc';
import Tooltip from '../Tooltip';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import Breadcrumbs from './Breadcrumbs';
import Sorter from './Sorter';

const LeftSide = function ({ children }) {
  return (
    <div
      css={theme => ({
        display: 'flex',
        gap: 16,
        width: '100%',
        alignItems: 'center',
        [theme.breakpoints.up('tablet')]: {
          gap: 24
        }
      })}
    >
      {children}
    </div>
  );
};

const RightSide = styled('div')({
  display: 'flex',
  gap: 16,
  alignItems: 'center'
});

function Logo() {
  const router = useRouter();
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));

  return (
    <img
      alt='logo'
      src={upTablet ? '/logo.svg' : '/logo_mobile.svg'}
      css={{
        cursor: 'pointer',
        height: upTablet ? 50 : 82
      }}
      onClick={() => {
        router.push({
          pathname: '/',
          query: {
            filter: router.query.filter || '',
            sorter: router.query.sorter || 'a-z',
            direction: router.query.direction || 'asc'
          }
        });
      }}
    />
  );
}

function Filter() {
  const router = useRouter();
  const timeout = useRef(null);
  const [value, setValue] = useState('');
  const disabled = !['/', '/folder/[folderID]'].includes(router.route);

  function handleFilterChange() {
    if (!router.isReady) return;
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      router.push({
        pathname: router.route,
        query: {
          folderID: router.query.folderID || '',
          fieldID: router.query.fieldID || '',
          filter: encodeURIComponent(value),
          sorter: router.query.sorter || 'a-z',
          direction: router.query.direction || 'desc'
        }
      });
    }, 250);
  }

  useEffect(() => {
    setValue(decodeURIComponent(router.query.filter || ''));
  }, [router.isReady]);

  useEffect(() => {
    handleFilterChange();
  }, [value]);

  return (
    <motion.input
      type='Typography'
      placeholder='Filter by keywords (comma separated)'
      onChange={e => setValue(e.target.value)}
      value={value}
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
        marginInlineStart: 50,
        fontFamily: 'Roboto',
        fontSize: 18,
        outline: 'none',
        boxSizing: 'border-box',
        color: '#000',
        background: '#f7f7f7',
        // boxShadow: theme.shadows.input,
        pointerEvents: disabled ? 'none' : 'all',
        fontFamily: 'Roboto Mono',
        fontSize: 14,
        lineHeight: 14,
        '&::placeholder': {
          color: 'rgba(0, 0, 0, 0.2)',
          fontStyle: 'italic'
        },
        '&::focus': {
          border: 'none'
        },
        [theme.breakpoints.up('tablet')]: {
          maxWidth: 543,
          marginInlineStart: 0
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
            color: '#f7f7f7',
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
                sorter: router.query.sorter || 'a-z',
                direction: router.query.direction === 'desc' ? 'asc' : 'desc'
              }
            });
          }}
        >
          {router.query.direction === 'desc' ? (
            <SortDescIcon size={28} color='#f7f7f7FFF' />
          ) : (
            <SortAscIcon size={28} color='#f7f7f7FFF' />
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

  function getOffsetY() {
    switch (true) {
      case minimizeRibbon && !upTablet && router.route === '/':
        return -105;
      case minimizeRibbon && !upTablet && router.route !== '/':
        return -161;
      default:
        return -0;
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
      <motion.div
        animate={{
          y: getOffsetY()
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 30
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const Wrapper = styled('div')({
  width: '100%',
  // background:
  //   'radial-gradient(92.96% 236.49% at 21.11% -12.32%, #2E04E3 0%, #612095 100%)',
  background: '#0000ff',
  boxSizing: 'border-box',
  zIndex: 1,
  position: 'relative',
  zIndex: 2
});

const FirstRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  height: 58,
  paddingInline: 24,
  gap: 24,
  paddingBlockStart: 16,
  boxSizing: 'border-box',
  [theme.breakpoints.up('tablet')]: {
    paddingInlineEnd: 18,
    paddingBlockStart: 0,
    height: 70,
    alignItems: 'center'
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
