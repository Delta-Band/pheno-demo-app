import { SortDesc as SortDescIcon } from '@styled-icons/octicons/SortDesc';
import { SortAsc as SortAscIcon } from '@styled-icons/octicons/SortAsc';
import PhenoIcon from './PhenoIcon';
import { Text, Button, styled } from '@nextui-org/react';
import Tooltip from './Tooltip';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const Wrapper = styled('div', {
  background: 'blue',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 60,
  paddingInline: 24,
  // background:
  //   'radial-gradient(92.96% 236.49% at 21.11% -12.32%, #2E04E3 0%, #612095 100%)',
  background:
    'radial-gradient(87.96% 244.49% at 0 2.68%, rgb(164 182 192) 35%, rgb(115 131 141) 100%)',
  boxSizing: 'border-box',
  gap: 24,
  zIndex: 1,
  position: 'relative'
});

const LeftSide = styled('div', {
  display: 'flex',
  gap: 16,
  width: '100%'
});

const RightSide = styled('div', {
  display: 'flex',
  gap: 16,
  alignItems: 'center'
});

const ButtonGroupWrapper = styled('div', {
  display: 'flex',
  height: 40,
  gap: 2
});

const buttonStyle = {
  color: '#FFF',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  width: '9vw',
  paddingInline: 24,
  borderRadius: 0,
  minWidth: 'min-content',
  maxWidth: 200,
  boxSizing: 'border-box',
  background: 'rgba(255, 255, 255, 0.1)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)'
  },
  '& .nextui-button-text': {
    gap: 16
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
  return <img alt='logo' src='logo.svg' />;
}

function Filter() {
  const router = useRouter();

  function handleFilterChange(value) {
    router.push(
      `${router.route}?filter=${encodeURIComponent(value)}&sorter=${
        router.query.sorter
      }&direction=${router.query.direction}`,
      undefined,
      {
        shallow: true
      }
    );
  }

  return (
    <input
      type='text'
      placeholder='Filter by keywords (comma separated)'
      onChange={e => handleFilterChange(e.target.value)}
      value={router.query.filter || ''}
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
    <Tooltip content={'Reverse Order'} rounded placement='bottom'>
      <motion.div
        animate={{
          rotateY: router.query.direction === 'asc' ? 180 : 0
        }}
      >
        <Button
          auto
          css={{
            background: 'transparent'
          }}
          icon={
            router.query.direction === 'desc' ? (
              <SortDescIcon size={24} />
            ) : (
              <SortAscIcon size={24} />
            )
          }
          onClick={() => {
            router.push(
              `${router.route}?filter=${router.query.filter || ''}&sorter=${
                router.query.sorter
              }&direction=${
                router.query.direction === 'desc' ? 'asc' : 'desc'
              }`,
              undefined,
              {
                shallow: true
              }
            );
          }}
        />
      </motion.div>
    </Tooltip>
  );
}

function SortBy() {
  const router = useRouter();

  function updateURL(sorter) {
    router.push(
      `${router.route}?filter=${
        router.query.filter || ''
      }&sorter=${sorter}&direction=${router.query.direction}`,
      undefined,
      {
        shallow: true
      }
    );
  }

  return (
    <ButtonGroupWrapper>
      <Tooltip content={'Sort by participants'} rounded placement='bottom'>
        <Button
          onClick={() => {
            updateURL('participants');
          }}
          css={[
            buttonStyle,
            router.query.sorter === 'participants' ? selected : {},
            {
              borderStartStartRadius: 999,
              borderEndStartRadius: 999
            }
          ]}
        >
          <PhenoIcon
            name='user'
            scale={1.2}
            color={router.query.sorter === 'participants' ? undefined : '#FFF'}
          />{' '}
          <Text css={counterStyle}>36</Text>
        </Button>
      </Tooltip>
      <Tooltip content={'Sort by measurements'} rounded placement='bottom'>
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
          <Text css={counterStyle}>36</Text>
        </Button>
      </Tooltip>
      <Tooltip content={'Sort by cohorts'} rounded placement='bottom'>
        <Button
          onClick={() => {
            updateURL('cohorts');
          }}
          css={[
            buttonStyle,
            router.query.sorter === 'cohorts' ? selected : {},
            {
              borderEndEndRadius: 999,
              borderStartEndRadius: 999
            }
          ]}
        >
          <PhenoIcon
            name='group'
            scale={1.2}
            color={router.query.sorter === 'cohorts' ? undefined : '#FFF'}
          />
          {/* <GroupIcon size={28} /> */}
          <Text css={counterStyle}>36</Text>
        </Button>
      </Tooltip>
    </ButtonGroupWrapper>
  );
}

export default function AppRibbon() {
  return (
    <Wrapper>
      <LeftSide>
        <Logo />
        <Filter />
      </LeftSide>
      <RightSide>
        <SortBy />
        <SortDirection />
      </RightSide>
    </Wrapper>
  );
}
