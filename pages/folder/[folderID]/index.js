/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import Head from 'next/head';
import { useState } from 'react';
import styled from '@emotion/styled';
import { List, ListItem, Layout } from '../../../components';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { fieldsSlice, foldersSlice } from '../../../redux';
import { Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getIconByDatType } from '../../../shared/utils';

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
        css={[
          buttonStyle,
          {
            background: showInfo ? '#FFF' : undefined
          }
        ]}
        variant={showInfo ? 'text' : 'contained'}
        size='large'
      >
        DATA
      </Button>
      <Button
        onClick={() => setShowInfo(true)}
        css={[
          buttonStyle,
          {
            background: showInfo ? undefined : '#FFF'
          }
        ]}
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
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  const [showInfo, setShowInfo] = useState(false);
  const { folderID } = router.query;
  const fields = useSelector(state =>
    fieldsSlice.selectors.fields(state, {
      folderID,
      filter: router.query.filter,
      sorter: router.query.sorter,
      direction: router.query.direction
    })
  );
  const folder = useSelector(state =>
    foldersSlice.selectors.folderById(state, folderID)
  );

  return folder ? (
    <>
      <Head>
        <title>Pheno Demo App</title>
      </Head>
      <Layout page='folder' paddingTop={upTablet ? 110 : 224}>
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
                router.push({
                  pathname: `/folder/[folderID]/field/[fieldID]`,
                  query: {
                    folderID: folderID,
                    fieldID: field.id,
                    filter: router.query.filter,
                    sorter: router.query.sorter,
                    direction: router.query.direction
                  }
                });
              }}
            />
          ))}
        </List>
        <DataInfoToggle showInfo={showInfo} setShowInfo={setShowInfo} />
      </Layout>
    </>
  ) : null;
};

export default FolderPage;
