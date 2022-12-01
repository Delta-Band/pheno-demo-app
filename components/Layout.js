/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

function Layout({ children, page }) {
  const prevRoute = useSelector(state => state.router.prevRoute);

  let direction;

  switch (true) {
    case page === 'root' && prevRoute === '/[folder]':
    case page === 'root' && prevRoute === '/':
      direction = -1;
      break;
    case page === 'folder' && prevRoute === '/':
    case page === 'folder' && prevRoute === '/[folder]':
      direction = 1;
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
        position: 'relative'
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
