import { List, ListItem, Layout } from '../components';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { fieldsSlice } from '../redux';

const Folder = () => {
  const router = useRouter();
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
    </Layout>
  ) : null;
};

export default Folder;
