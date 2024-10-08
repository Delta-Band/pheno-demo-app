/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import { Typography, Button, styled } from '@mui/material';
import PhenoIcon from '../PhenoIcon';
import Tooltip from '../Tooltip';
import { useRouter } from 'next/router';
import { fieldsSlice, foldersSlice } from '../../redux';
import { useSelector } from 'react-redux';
import FormattedNumber from '../FormattedNumber';

const buttonStyle = {
  color: '#f7f7f7',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 18,
  height: '100%',
  width: '100vw',
  paddingInline: 24,
  borderRadius: 0,
  // minWidth: 'min-content',
  boxSizing: 'border-box',
  background: 'rgba(255, 255, 255, 0.15)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.25)'
  }
};

const selected = {
  color: '#000',
  background: '#f7f7f7',
  '&:hover': {
    background: '#f7f7f7'
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

function Sorter() {
  const router = useRouter();
  const theme = useTheme();
  const totals = useSelector(state => foldersSlice.selectors.totals(state));

  function updateURL(sorter) {
    router.push({
      pathname: router.asPath.split('?')[0],
      query: {
        filter: router.query.filter || '',
        sorter,
        direction: router.query.direction || 'asc'
      }
    });
  }

  const ButtonGroupWrapper = styled('div')({
    display: 'flex',
    height: 40,
    gap: 2,
    borderRadius: 999,
    overflow: 'hidden',
    // boxShadow: theme.shadows.input,
    width: '100%',
    opacity: router.route === '/folder/[folderID]/field/[fieldID]' ? 0.3 : 1,
    pointerEvents:
      router.route === '/folder/[folderID]/field/[fieldID]' ? 'none' : 'all',
    [theme.breakpoints.up('tablet')]: {
      width: '36vw',
      maxWidth: 495
    }
  });

  return (
    <ButtonGroupWrapper>
      <Tooltip content={'Sort by cohorts'}>
        <Button
          onClick={() => {
            updateURL('a-z');
          }}
          css={[buttonStyle, router.query.sorter === 'a-z' ? selected : {}]}
        >
          <PhenoIcon
            name='a-z'
            scale={1.4}
            color={router.query.sorter === 'a-z' ? undefined : '#f7f7f7'}
          />
          {/* <Typography css={counterStyle}>
            <FormattedNumber value={totals.cohorts.length} />
          </Typography> */}
        </Button>
      </Tooltip>
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
            color={
              router.query.sorter === 'participants' ? undefined : '#f7f7f7'
            }
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
            color={
              router.query.sorter === 'measurements' ? undefined : '#f7f7f7'
            }
          />{' '}
          <Typography css={counterStyle}>
            <FormattedNumber value={totals.measurements} />
          </Typography>
        </Button>
      </Tooltip>
    </ButtonGroupWrapper>
  );
}

export default Sorter;
