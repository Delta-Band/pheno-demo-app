/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { Typography, Button, Chip } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { PhenoIcon } from '../components';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Highlighter from 'react-highlight-words';
import { ChevronRight as CaretRight } from '@styled-icons/fluentui-system-regular/ChevronRight';
import Tooltip from './Tooltip';
import FormattedNumber from './FormattedNumber';

const ListWrapper = styled.div({
  width: '100%',
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
  highlights = [],
  comingSoon = false
}) {
  const router = useRouter();
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));
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
        cursor: comingSoon ? 'default' : 'pointer',
        pointerEvents: comingSoon ? 'none' : 'all',
        transition: '0.25s ease-out',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
      }}
    >
      <Tooltip content={item.description}>
        <Button
          fullWidth
          onClick={onClick}
          variant='text'
          color='inherit'
          css={{
            paddingInlineStart: 24,
            paddingInlineEnd: upTablet ? 24 : 12,
            paddingBlock: 16,
            borderRadius: 0,
            textTransform: 'none',
            background: 'rgba(0, 0, 0, 0)',
            justifyContent: 'space-between',
            '&:hover': {
              background: 'rgba(0, 0, 0, 0.05)'
            }
          }}
        >
          <LeftSide
            css={{
              opacity: comingSoon ? 0.3 : 1
            }}
          >
            <IconFixedWidth>
              <PhenoIcon name={prefixIcon} />
            </IconFixedWidth>

            <Typography
              variant='body1'
              lineHeight={1}
              css={{
                transform: 'translateY(1px)',
                userSelect: 'all',
                textAlign: 'start',
                lineHeight: '1.5em'
              }}
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
          {comingSoon ? (
            <RightSide>
              <Chip label='Coming Soon' />
            </RightSide>
          ) : (
            <RightSide>
              <Tooltip content={sortIconTip} placement='left'>
                {sorter !== 'a-z' ? (
                  <RightSide>
                    <Typography
                      variant='subtitle1'
                      lineHeight={1}
                      css={{
                        transform: 'translateY(1px)',
                        color: theme.palette.accentColor
                      }}
                    >
                      <FormattedNumber value={item[sorter]} />
                    </Typography>
                    <PhenoIcon
                      name={sortIcon}
                      color={theme.palette.accentColor}
                    />
                  </RightSide>
                ) : null}
              </Tooltip>
              <CaretRight size={28} />
              {/* <PhenoIcon name='chevron-right' /> */}
            </RightSide>
          )}
        </Button>
      </Tooltip>
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
