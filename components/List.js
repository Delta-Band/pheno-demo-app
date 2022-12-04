/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography, Button } from '@mui/material';
import { PhenoIcon } from '../components';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Highlighter from 'react-highlight-words';
import { ChevronRight as CaretRight } from '@styled-icons/boxicons-solid/ChevronRight';
import Tooltip from './Tooltip';
import FormattedNumber from './FormattedNumber';

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
    borderBottom: '2px solid #FFC36A'
  }
});

const RightSide = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 16
});

const IconFixedWidth = styled.div({
  display: 'flex',
  justifyContent: 'center',
  width: 21
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
  let sortIconTip;
  switch (router.query.sorter) {
    case 'measurements':
      sortIcon = 'meter';
      break;
    case 'cohorts':
      sortIcon = 'group';
      sortIconTip = item.cohorts.join('\n');
      break;
    default:
      sortIcon = 'user';
      break;
  }

  return (
    <li
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
        onClick={onClick}
        variant='text'
        color='inherit'
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
          <IconFixedWidth>
            <PhenoIcon name={prefixIcon} />
          </IconFixedWidth>
          <Typography
            lineHeight={1}
            css={{ transform: 'translateY(1px)', userSelect: 'all' }}
          >
            <Highlighter
              caseSensitive={false}
              highlightClassName='highlighted'
              autoEscape
              searchWords={highlights.map(h => h.trim())}
              textToHighlight={item.name}
            />
          </Typography>
        </LeftSide>
        <RightSide>
          <Tooltip content={sortIconTip} placement='left'>
            <RightSide>
              <Typography
                variant='subtitle1'
                lineHeight={1}
                css={{
                  transform: 'translateY(1px)',
                  color: theme.palette.accentColor
                }}
              >
                <FormattedNumber
                  value={
                    sorter === 'cohorts' ? item[sorter].length : item[sorter]
                  }
                />
              </Typography>
              <PhenoIcon name={sortIcon} color={theme.palette.accentColor} />
            </RightSide>
          </Tooltip>
          <CaretRight size={28} />
          {/* <PhenoIcon name='chevron-right' /> */}
        </RightSide>
      </Button>
    </li>
  );
}

export function List({ children }) {
  return (
    <ListWrapper>
      <ul
        css={{
          margin: 0,
          padding: 0
        }}
      >
        {children}
      </ul>
    </ListWrapper>
  );
}