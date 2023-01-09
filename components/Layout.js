/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { layoutSlice } from '../redux';

function Layout({ children, page, paddingTop = 0 }) {
  const prevRoute = useSelector(state => state.router.prevRoute);
  const minimizeRibbon = useSelector(state => state.layout.minimizeRibbon);
  const minRibbonRef = useRef(minimizeRibbon);
  const layoutRef = useRef(null);
  const dispatch = useDispatch();

  let direction;

  switch (true) {
    case page === 'folder' && prevRoute === '/':
    case page === 'field' && prevRoute === '/folder/[folderID]':
    case page === 'field' && prevRoute === '/folder/[folderID]/field/[fieldID]':
    case page === 'folder-info' && prevRoute === '/folder/[folderID]':
      direction = 1;
      break;
    case page === 'root':
    case page === 'folder' &&
      prevRoute === '/folder/[folderID]/field/[fieldID]':
    case page === 'folder' && prevRoute === '/folder/[folderID]':
      direction = -1;
      break;
    default:
      direction = 0;
      break;
  }

  useEffect(() => {
    minRibbonRef.current = minimizeRibbon;
  }, [minimizeRibbon]);

  useEffect(() => {
    function handleScroll() {
      if (minRibbonRef.current && layoutRef.current.scrollTop === 0) {
        dispatch(layoutSlice.actions.setMinimizeRibbon(false));
      } else if (!minRibbonRef.current && layoutRef.current.scrollTop > 0) {
        dispatch(layoutSlice.actions.setMinimizeRibbon(true));
      }
    }
    layoutRef.current.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.div
        ref={layoutRef}
        initial={{ x: `${direction * 100}%`, opacity: 0, paddingTop }}
        animate={{ x: 0, opacity: 1, paddingTop }}
        exit={{ x: `${direction * 100}%`, opacity: 0 }}
        css={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
          position: 'absolute',
          top: 0,
          left: 0,
          boxSizing: 'border-box',
          '&::-webkit-scrollbar ': {
            width: 8
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent'
          },
          '&::-webkit-scrollbar-thumb': {
            // background: 'rgb(60 60 60 / 80%)'
            borderInlineStart: '6px solid #21336c'
          }
        }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 30
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
export default Layout;
