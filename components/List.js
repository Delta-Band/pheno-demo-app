/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography, Button } from '@mui/material';
import { PhenoIcon } from '../components';
import { useTheme } from '@mui/material/styles';

import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Highlighter from 'react-highlight-words';

const ListWrapper = styled.div({
  width: '100%',
  height: '100%',
  overflowX: 'hidden',
  overflowY: 'auto',
  zIndex: 1,
  position: 'relative'
});

const LeftSide = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  '& .highlighted': {
    backgroundColor: 'transparent',
    color: '#A1B5D1',
    borderBottom: '2px solid #FFC36A'
  }
});

const RightSide = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 16
});

export function ListItem({
  item,
  sorter,
  prefixIcon,
  onClick,
  highlights = []
}) {
  const router = useRouter();
  const theme = useTheme();
  const variants = {
    visible: {
      opacity: 1,
      transition: { type: 'spring', stiffness: 30 }
    },
    hidden: { opacity: 0 }
  };

  let sortIcon;
  switch (router.query.sorter) {
    case 'measurements':
      sortIcon = 'meter';
      break;
    case 'cohorts':
      sortIcon = 'group';
      break;
    default:
      sortIcon = 'user';
      break;
  }

  return (
    <motion.li
      variants={variants}
      css={{
        margin: 0,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: '0.25s ease-out'
      }}
    >
      <Button
        fullWidth
        size='xl'
        onClick={onClick}
        css={{
          paddingInline: 24,
          paddingBlock: 16,
          borderRadius: 0,
          textTransform: 'capitalize',
          background: 'rgba(0, 0, 0, 0)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          justifyContent: 'space-between',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.05)'
          }
        }}
      >
        <LeftSide>
          <PhenoIcon name={prefixIcon} />
          <Typography>
            <Highlighter
              caseSensitive={false}
              highlightClassName='highlighted'
              searchWords={highlights}
              textToHighlight={item.name}
            />
          </Typography>
        </LeftSide>
        <RightSide>
          <Typography css={{ color: theme.palette.accentColor }}>
            {item[sorter]}
          </Typography>
          <PhenoIcon name={sortIcon} color={theme.palette.accentColor} />
          <PhenoIcon name='chevron-right' />
        </RightSide>
      </Button>
    </motion.li>
  );
}

export function List({ children }) {
  const variants = {
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    },
    hidden: { opacity: 0 }
  };

  return (
    <ListWrapper>
      <motion.ul
        css={{
          margin: 0,
          padding: 0,
          color: '#A1B5D1'
        }}
        initial='hidden'
        animate='visible'
        variants={variants}
      >
        {children}
      </motion.ul>
    </ListWrapper>
  );
}
