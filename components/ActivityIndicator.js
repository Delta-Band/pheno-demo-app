import React from 'react';
/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import Script from 'next/script';

export default function ActivityIndicator({ children }) {
  const working = useSelector(
    state => state.fields.working || state.folders.working
  );

  return (
    <>
      <Script src='/lottie-interactive.js'></Script>
      {children}
      <motion.div
        css={{
          pointerEvents: 'none',
          position: 'absolute',
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          backdropFilter: 'blur(7px)',
          top: 0,
          background: `rgba(255, 255, 255, 0.75)`,
          paddingTop: 40
        }}
        animate={{ opacity: working ? 1 : 0 }}
      >
        {/* <lottie-interactive
          path='working-animation.json'
          background='transparent'
          style={{
            width: 300,
            height: 300
          }}
          autoplay=''
          loop=''
          speed='1'
          delay='0'
          aspect-ratio='xMidYMid slice'
        /> */}
      </motion.div>
    </>
  );
}
