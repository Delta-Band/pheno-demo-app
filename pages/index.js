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

function ListItem({ item, sortIcon, sorter }) {
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
          paddingInline: 24,
          paddingBlock: 16,
          borderRadius: 0,
          textTransform: 'capitalize',
          background: 'rgba(0, 0, 0, 0)',
          width: '100%',
          '&:hover': {
            background: 'rgba(0, 0, 0, 0.1)'
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
          <PhenoIcon name='folder' />
          <Text>
            {/* <Highlighter
              caseSensitive={false}
              highlightClassName='highlighted'
              searchWords={[highlight]}
              textToHighlight={item.name}
            /> */}
            {item.name}
          </Text>
        </LeftSide>
        <RightSide>
          <Text css={glow}>{item[sorter]}</Text>
          <PhenoIcon name={sortIcon} color='#ab73d8' />
          <PhenoIcon name='chevron-right' />
        </RightSide>
      </Button>
    </motion.li>
  );
}

const glow = {
  color: '#ab73d8'
  // textShadow: '0px 0px 3px #ab73d8'
};

export default function Home() {
  const router = useRouter();
  const folders = useSelector(state =>
    fieldsSlice.selectors.folders(state, {
      filter: router.query.filter,
      sorter: router.query.sorter,
      direction: router.query.direction
    })
  );

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
    <FolderListWrapper>
      <List>
        {folders.map(folder => (
          <ListItem
            key={folder.name}
            item={folder}
            sortIcon={sortIcon}
            sorter={router.query.sorter}
          />
        ))}
      </List>
    </FolderListWrapper>
  );
}
