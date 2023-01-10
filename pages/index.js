import { useEffect } from 'react';
import { fieldsSlice, foldersSlice } from '../redux';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { List, ListItem, Layout } from '../components';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

export default function Home() {
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  const router = useRouter();
  const dispatch = useDispatch();
  const folders = useSelector(state =>
    foldersSlice.selectors.folders(state, {
      sorter: router.query.sorter,
      direction: router.query.direction
    })
  );

  function getPaddingTop() {
    switch (true) {
      case upTablet:
        return 70;
      case !upTablet:
        return 170;
    }
  }

  return (
    <>
      <Head>
        <title>Pheno Catalog - Home</title>
      </Head>
      <Layout page='root' paddingTop={getPaddingTop()}>
        <List>
          {folders
            .filter(folder => folder.participants)
            .map(folder => (
              <ListItem
                key={folder.name}
                prefixIcon='folder'
                item={folder}
                comingSoon={!folder.participants}
                sorter={router.query.sorter}
                onClick={() => {
                  router.push({
                    pathname: `/folder/[folderID]`,
                    query: {
                      folderID: folder.id,
                      filter: router.query.filter,
                      sorter: router.query.sorter,
                      direction: router.query.direction
                    },
                    shallow: true
                  });
                }}
              />
            ))}
          {folders
            .filter(folder => !folder.participants)
            .map(folder => (
              <ListItem
                key={folder.name}
                prefixIcon='folder'
                item={folder}
                // comingSoon={!folder.participants}
                sorter={router.query.sorter}
                onClick={() => {
                  router.push({
                    pathname: `/folder/[folderID]`,
                    query: {
                      folderID: folder.id,
                      filter: router.query.filter,
                      sorter: router.query.sorter,
                      direction: router.query.direction
                    },
                    shallow: true
                  });
                }}
              />
            ))}
        </List>
      </Layout>
    </>
  );
}
