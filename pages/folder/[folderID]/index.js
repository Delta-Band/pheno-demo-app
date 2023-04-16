/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { promises as fs } from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';
import { List, ListItem, Layout, FolderInfo } from '../../../components';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fieldsSlice, foldersSlice, routerSlice } from '../../../redux';
import { Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getIconByDatType } from '../../../shared/utils';
import { AnimatePresence } from 'framer-motion';

function DataInfoToggle({ showInfo, setShowInfo, upTablet }) {
  const theme = useTheme();
  const dispatch = useDispatch();

  const Wrapper = styled.div({
    overflow: 'hidden',
    borderRadius: 999,
    boxShadow: theme.shadows.input,
    display: 'inline-flex',
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: `translate(-50%, -${upTablet ? 100 : 50}%)`,
    zIndex: 1,
    width: 220
  });

  const buttonStyle = {
    borderRadius: 0,
    flexShrink: 0,
    width: '50%'
  };

  const buttonStyleNotSelected = {
    background: '#f7f7f7',
    color: theme.palette.primary.main,
    '&:hover': {
      background: '#cdcdcd'
    }
  };

  return (
    <Wrapper>
      <Button
        onClick={() => {
          setShowInfo(false);
        }}
        css={[buttonStyle, showInfo ? buttonStyleNotSelected : {}]}
        variant='contained'
        size='large'
      >
        DATA
      </Button>
      <Button
        onClick={() => {
          setShowInfo(true);
          dispatch(routerSlice.actions.setPrevRoute('/folder/[folderID]'));
        }}
        css={[buttonStyle, !showInfo ? buttonStyleNotSelected : {}]}
        variant='contained'
        size='large'
      >
        INFO
      </Button>
    </Wrapper>
  );
}

const FolderPage = ({ folderInfoMDx }) => {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  const [showInfo, setShowInfo] = useState(false);
  const { folderID } = router.query;
  const fields = useSelector(state =>
    fieldsSlice.selectors.fields(state, {
      sorter: router.query.sorter,
      sorter: router.query.sorter || 'a-z',
      direction: router.query.direction || 'asc'
    })
  );
  const folder = useSelector(state =>
    foldersSlice.selectors.folderById(state, folderID)
  );

  function getPaddingTop() {
    switch (true) {
      case upTablet:
        return 122;
      case !upTablet:
        return 200;
    }
  }

  return folder ? (
    <>
      <Head>
        <title>{`Pheno Catalog - ${folder.name}`}</title>
      </Head>
      <AnimatePresence>
        {showInfo ? (
          <Layout page='folder-info' paddingTop={getPaddingTop()} key='info'>
            <FolderInfo mdx={JSON.parse(folderInfoMDx)} />
          </Layout>
        ) : (
          <Layout page='folder' paddingTop={getPaddingTop()} key='data'>
            <List>
              {fields
                .filter(field => field.participants)
                .map(field => (
                  <ListItem
                    key={field.name}
                    prefixIcon={getIconByDatType(field.dataType)}
                    item={field}
                    comingSoon={!field.participants}
                    sorter={router.query.sorter}
                    highlights={decodeURIComponent(
                      router.query.filter || ''
                    ).split(',')}
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
              {fields
                .filter(field => !field.participants)
                .map(field => (
                  <ListItem
                    key={field.name}
                    prefixIcon={getIconByDatType(field.dataType)}
                    item={field}
                    comingSoon={!field.participants}
                    sorter={router.query.sorter}
                    highlights={decodeURIComponent(
                      router.query.filter || ''
                    ).split(',')}
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
          </Layout>
        )}
      </AnimatePresence>
      <DataInfoToggle
        showInfo={showInfo}
        setShowInfo={setShowInfo}
        upTablet={upTablet}
      />
    </>
  ) : null;
};

export default FolderPage;

export async function getStaticProps(context) {
  const mdFoldersDir = path.join(process.cwd(), 'public/md/folders');
  const filePath = path.join(
    mdFoldersDir,
    `${context.params.folderID}/index.mdx`
  );
  const content = await fs.readFile(filePath, 'utf8');
  const matter = grayMatter(content);
  return {
    props: {
      folderInfoMDx: JSON.stringify(matter)
    }
  };
}

export async function getStaticPaths() {
  const mdFoldersDir = path.join(process.cwd(), 'public/md/folders');
  const fileNames = await fs.readdir(mdFoldersDir);
  return {
    paths: fileNames.map(fileName => `/folder/${fileName.replace('.mdx', '')}`),
    fallback: false
  };
}
