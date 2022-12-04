/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

function Layout({ children, page, paddingTop = 0 }) {
  const prevRoute = useSelector(state => state.router.prevRoute);
  const router = useRouter();

  let direction;

  switch (true) {
    case page === 'folder' && prevRoute === '/':
    case page === 'field' && prevRoute === '/folder/[folderID]':
    case page === 'field' && prevRoute === '/folder/[folderID]/field/[fieldID]':
      direction = 1;
      break;
    case page === 'folder' &&
      prevRoute === '/folder/[folderID]/field/[fieldID]':
    case page === 'folder' && prevRoute === '/folder/[folderID]':
    case page === 'root':
    case page === 'folder' &&
      router.route === '/folder/[folderID]/field/[fieldID]':
      direction = -1;
      break;
    default:
      direction = 0;
      break;
  }

  return (
    <motion.div
      initial={{ x: `${direction * 100}%`, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: `${direction * 100}%`, opacity: 0 }}
      css={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        position: 'absolute',
        top: 0,
        left: 0,
        paddingTop,
        boxSizing: 'border-box'
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 30
      }}
    >
      {children}
    </motion.div>
  );
}
export default Layout;
