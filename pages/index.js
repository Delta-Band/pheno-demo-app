/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography, Button } from '@mui/material';
import { PhenoIcon } from '../components';
import { motion } from 'framer-motion';

const FolderListWrapper = styled.div({
  width: '100%',
  height: '100%',
  overflowX: 'hidden',
  overflowY: 'auto',
  zIndex: 1,
  position: 'relative'
});

function List({ children }) {
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
  );
}

function ListItem({ children }) {
  const variants = {
    visible: {
      opacity: 1,
      transition: { type: 'spring', stiffness: 30 }
    },
    hidden: { opacity: 0 }
  };

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
        css={{
          color: '#A1B5D1',
          paddingInline: 24,
          paddingBlock: 16,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 0,
          '&:hover': {
            background: '#ffffff1a'
          }
        }}
      >
        {children}
      </Button>
    </motion.li>
  );
}

const LeftSide = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 16
});

const RightSide = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 16
});

const yellowGlow = {
  color: '#FFC36A',
  textShadow: '0px 0px 7px #FFC36A'
};

export default function Home() {
  return (
    <FolderListWrapper>
      <List>
        <ListItem>
          <LeftSide>
            <PhenoIcon name='folder' color='#A1B5D1' />
            <Typography>ABI</Typography>
          </LeftSide>
          <RightSide>
            <Typography css={yellowGlow}>12.6k</Typography>
            <PhenoIcon name='user' color='#FFC36A' glow />
            <PhenoIcon name='chevron-right' color='#A1B5D1' />
          </RightSide>
        </ListItem>
      </List>
    </FolderListWrapper>
  );
}
