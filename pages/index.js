import { fieldsSlice } from '../redux';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { List, ListItem, Layout } from '../components';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

export default function Home() {
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  const router = useRouter();
  const folders = useSelector(state =>
    fieldsSlice.selectors.folders(state, {
      filter: router.query.filter || '',
      sorter: router.query.sorter,
      direction: router.query.direction
    })
  );

  return (
    <>
      <Head>
        <title>Pheno Demo App</title>
      </Head>
      <Layout page='root' paddingTop={upTablet ? 60 : 170}>
        <List>
          {folders.map(folder => (
            <ListItem
              key={folder.name}
              prefixIcon='folder'
              item={folder}
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
