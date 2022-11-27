import { PhenoIcon } from '../components';
import { motion } from 'framer-motion';
import { fieldsSlice } from '../redux';
import { useSelector } from 'react-redux';
import { Text, Button, styled } from '@nextui-org/react';
import { useRouter } from 'next/router';
import Highlighter from 'react-highlight-words';

const FolderListWrapper = styled('div', {
  width: '100%',
  height: '100%',
  overflowX: 'hidden',
  overflowY: 'auto',
  zIndex: 1,
  position: 'relative'
});

const LeftSide = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  '& .highlighted': {
    backgroundColor: 'transparent',
    color: '#A1B5D1',
    borderBottom: '2px solid #FFC36A'
  }
});

const RightSide = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 16
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

function ListItem({ item, highlight }) {
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
        auto
        size='xl'
        css={{
          color: '#A1B5D1',
          paddingInline: 24,
          paddingBlock: 16,
          borderRadius: 0,
          textTransform: 'capitalize',
          background: 'transparent',
          width: '100%',
          '&:hover': {
            background: '#ffffff1a'
          },
          '& .nextui-button-text': {
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex'
          }
        }}
      >
        <LeftSide>
          <PhenoIcon name='folder' color='#A1B5D1' />
          <Text color='#A1B5D1'>
            <Highlighter
              caseSensitive={false}
              highlightClassName='highlighted'
              searchWords={[highlight]}
              textToHighlight={item.name}
            />
          </Text>
        </LeftSide>
        <RightSide>
          <Text css={yellowGlow}>{item.participants}</Text>
          <PhenoIcon name='user' color='#FFC36A' glow />
          <PhenoIcon name='chevron-right' color='#A1B5D1' />
        </RightSide>
      </Button>
    </motion.li>
  );
}

const yellowGlow = {
  color: '#FFC36A',
  textShadow: '0px 0px 7px #FFC36A'
};

export default function Home() {
  const folders = useSelector(fieldsSlice.selectors.folders);
  const router = useRouter();

  return (
    <FolderListWrapper>
      <List>
        {folders
          .filter(folder => {
            return (
              folder.name
                .toLowerCase()
                .search((router.query.filter || '').toLowerCase()) >= 0
            );
          })
          .map(folder => (
            <ListItem
              key={folder.name}
              item={folder}
              highlight={router.query.filter || ''}
            />
          ))}
      </List>
    </FolderListWrapper>
  );
}
