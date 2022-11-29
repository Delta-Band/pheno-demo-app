import { fieldsSlice } from '../redux';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Highlighter from 'react-highlight-words';
import { List, ListItem } from '../components';

export default function Home() {
  const router = useRouter();
  const folders = useSelector(state =>
    fieldsSlice.selectors.folders(state, {
      filter: router.query.filter,
      sorter: router.query.sorter,
      direction: router.query.direction
    })
  );

  return (
    <List>
      {folders.map(folder => (
        <ListItem
          key={folder.name}
          prefixIcon='folder'
          item={folder}
          sorter={router.query.sorter}
          onClick={() => {
            router.push({
              pathname: folder.name.toLowerCase().replace(' ', '-'),
              query: {
                filter: router.query.filter,
                sorter: router.query.sorter,
                direction: router.query.direction
              }
            });
          }}
        />
      ))}
    </List>
  );
}
