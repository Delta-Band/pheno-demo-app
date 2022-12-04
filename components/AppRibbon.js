/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import { Typography, Button } from '@mui/material';
import { SortDesc as SortDescIcon } from '@styled-icons/octicons/SortDesc';
import { SortAsc as SortAscIcon } from '@styled-icons/octicons/SortAsc';
import PhenoIcon from './PhenoIcon';
import Tooltip from './Tooltip';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { fieldsSlice, foldersSlice } from '../redux';
import { useSelector } from 'react-redux';
import { Home as HomeIcon } from '@styled-icons/boxicons-regular/Home';
import { RightArrowAlt as RightArrowIcon } from '@styled-icons/boxicons-regular/RightArrowAlt';
import { Folder as FolderIcon } from '@styled-icons/boxicons-regular/Folder';
import FormattedNumber from './FormattedNumber';
import { getIconByDatType } from '../shared/utils';

const Wrapper = styled.div({
  width: '100%',
  // background:
  //   'radial-gradient(92.96% 236.49% at 21.11% -12.32%, #2E04E3 0%, #612095 100%)',
  background:
    '-webkit-radial-gradient(right bottom, rgb(83 103 182) 0%, rgb(31 50 106) 100%)',
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

const TopRow = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 60,
  paddingInline: 24,
  paddingInlineEnd: 18,
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

  return (
    <input
      disabled={router.query.fieldID}
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
        boxShadow: theme.shadows.input,
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
        <Button
          css={{
            color: '#FFF',
            minWidth: 'unset'
          }}
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
            <SortDescIcon size={28} color='#FFFFFF' />
          ) : (
            <SortAscIcon size={28} color='#FFFFFF' />
          )}
        </Button>
      </motion.div>
    </Tooltip>
  );
}

function Sorter() {
  const router = useRouter();
  const theme = useTheme();
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

  const ButtonGroupWrapper = styled.div({
    display: 'flex',
    height: 40,
    gap: 2,
    borderRadius: 999,
    overflow: 'hidden',
    boxShadow: theme.shadows.input
  });

  return (
    <ButtonGroupWrapper>
      <Tooltip content={'Sort by participants'}>
        <Button
          onClick={() => {
            updateURL('participants');
          }}
          css={[
            buttonStyle,
            router.query.sorter === 'participants' ? selected : {}
          ]}
        >
          <PhenoIcon
            name='user'
            scale={1.2}
            color={router.query.sorter === 'participants' ? undefined : '#FFF'}
          />{' '}
          <Typography css={counterStyle}>
            <FormattedNumber value={totals.participants} />
          </Typography>
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
          <Typography css={counterStyle}>
            <FormattedNumber value={totals.measurements} />
          </Typography>
        </Button>
      </Tooltip>
      <Tooltip content={'Sort by cohorts'}>
        <Button
          onClick={() => {
            updateURL('cohorts');
          }}
          css={[buttonStyle, router.query.sorter === 'cohorts' ? selected : {}]}
        >
          <PhenoIcon
            name='group'
            scale={1.2}
            color={router.query.sorter === 'cohorts' ? undefined : '#FFF'}
          />
          {/* <GroupIcon size={28} /> */}
          <Typography css={counterStyle}>
            <FormattedNumber value={totals.cohorts.length} />
          </Typography>
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
        height: router.route === '/' ? 60 : 110
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

function Breadcrumbs({}) {
  const router = useRouter();
  const field = useSelector(state =>
    fieldsSlice.selectors.field(state, router.query.fieldID)
  );
  const folder = useSelector(state =>
    foldersSlice.selectors.folderById(state, router.query.folderID)
  );

  const liVariants = {
    visible: {
      opacity: 1
    },
    hidden: { opacity: 0 }
  };

  const buttonStyle = {
    gap: 8,
    color: '#FFF',
    minWidth: 'unset',
    textTransform: 'none',
    '&.Mui-disabled': {
      color: '#FFF'
    }
  };

  return (
    <ul
      css={{
        width: '100%',
        color: '#FFF',
        margin: 0,
        paddingInline: 20,
        listStyle: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}
    >
      <li>
        <Button
          css={[buttonStyle, { paddingInline: 4 }]}
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
        >
          <HomeIcon size={28} color='#FFF' />
        </Button>
      </li>
      <li>
        <RightArrowIcon size={28} color='#FFF' />
      </li>
      <li>
        <Button
          css={buttonStyle}
          disabled={router.route === '/[folder]'}
          onClick={() => {
            router.push({
              pathname: '/folder/[folderID]',
              query: {
                folderID: router.query.folderID,
                filter: router.query.filter || '',
                sorter: router.query.sorter || 'participants',
                direction: router.query.direction || 'desc'
              }
            });
          }}
        >
          <FolderIcon size={26} color='#FFF' />
          <Typography>{folder?.name}</Typography>
        </Button>
      </li>
      <AnimatePresence>
        {field ? (
          <motion.li
            key='arrow'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <RightArrowIcon size={28} color='#FFF' />
          </motion.li>
        ) : null}
        {field ? (
          <motion.li
            key='name'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Button css={[buttonStyle, { paddingInlineStart: 10 }]} disabled>
              <PhenoIcon
                name={getIconByDatType(field.type)}
                color='#FFF'
                scale={1.15}
              />
              <Typography>{field.name}</Typography>
            </Button>
          </motion.li>
        ) : null}
      </AnimatePresence>
    </ul>
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
