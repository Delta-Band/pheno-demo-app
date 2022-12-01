/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { useState } from 'react';
import styled from '@emotion/styled';
import { List, ListItem, Layout } from '../components';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { fieldsSlice } from '../redux';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function DataInfoToggle({ showInfo, setShowInfo }) {
  const theme = useTheme();

  const Wrapper = styled.div({
    overflow: 'hidden',
    borderRadius: 999,
    boxShadow: theme.shadows.input,
    display: 'inline-flex',
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, -100%)',
    zIndex: 1,
    width: 220
  });

  const buttonStyle = {
    borderRadius: 0,
    flexShrink: 0,
    width: '50%'
  };

  return (
    <Wrapper>
      <Button
        onClick={() => setShowInfo(false)}
        css={buttonStyle}
        variant={showInfo ? 'text' : 'contained'}
        size='large'
      >
        DATA
      </Button>
      <Button
        onClick={() => setShowInfo(true)}
        css={buttonStyle}
        variant={showInfo ? 'contained' : 'text'}
        size='large'
      >
        INFO
      </Button>
    </Wrapper>
  );
}

const FolderPage = () => {
  const router = useRouter();
  const [showInfo, setShowInfo] = useState(false);
  const { folder } = router.query;
  const fields = useSelector(state =>
    fieldsSlice.selectors.fields(state, {
      folder,
      filter: router.query.filter,
      sorter: router.query.sorter,
      direction: router.query.direction
    })
  );

  function getIconByDatType(type) {
    switch (type) {
      case 'time series':
        return 'timer';
      case 'tabular':
        return 'table';
      case 'image':
        return 'image';
      case 'molecular':
        return 'molecule';
      case 'health records':
        return 'health-book';
      default:
        return null;
    }
  }

  return folder ? (
    <Layout page='folder'>
      <List>
        {fields.map(field => (
          <ListItem
            key={field.name}
            prefixIcon={getIconByDatType(field.type)}
            item={field}
            sorter={router.query.sorter}
            highlights={decodeURIComponent(router.query.filter || '').split(
              ','
            )}
            onClick={() => {
              // router.push(
              //   `${field.name.toLowerCase().replace(' ', '-')}?filter=${
              //     router.query.filter
              //   }&sorter=${router.query.sorter}&direction=${
              //     router.query.direction
              //   }`,
              //   undefined,
              //   {
              //     shallow: true
              //   }
              // );
            }}
          />
        ))}
      </List>
      <DataInfoToggle showInfo={showInfo} setShowInfo={setShowInfo} />
    </Layout>
  ) : null;
};

export default FolderPage;
