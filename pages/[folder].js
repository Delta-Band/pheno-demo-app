import { List, ListItem } from '../components';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { fieldsSlice } from '../redux';

const Folder = () => {
  const router = useRouter();
  const { folder } = router.query;
  console.log('folder', folder);
  const fields = useSelector(state =>
    fieldsSlice.selectors.fields(state, {
      folder,
      filter: router.query.filter,
      sorter: router.query.sorter,
      direction: router.query.direction
    })
  );

  return (
    <List>
      {fields.map(field => (
        <ListItem
          key={field.name}
          prefixIcon='folder'
          item={field}
          sorter={router.query.sorter}
          highlight
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
  );
};

export default Folder;
