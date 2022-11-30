/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { useEffect } from 'react';
import Head from 'next/head';
import { store } from '../redux';
import { Provider } from 'react-redux';
import { FirstLoad, AppRibbon } from '../components';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import styled from '@emotion/styled';
import { globalStyles } from '../shared/styles';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';

const BackgroundImg = styled.div({
  position: 'fixed',
  width: '100%',
  height: '100%',
  // backgroundImage: 'url(ppl2.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  top: 0
});

const BackgroundGradientMask = styled.div({
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  background:
    'linear-gradient(142.62deg, rgb(243 243 243 / 56%) 38.07%, rgb(100 100 100 / 46%) 80%)'
});

const noOverlayWorkaroundScript = `
  window.addEventListener('error', event => {
    event.stopImmediatePropagation()
  })
  window.addEventListener('unhandledrejection', event => {
    event.stopImmediatePropagation()
  })
`;

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    router.push({
      pathname: router.asPath.split('?')[0],
      query: {
        filter: router.query.filter || '',
        sorter: router.query.sorter || 'participants',
        direction: router.query.direction || 'desc'
      }
    });
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>Pheno Demo App</title>
        <meta name='description' content='Pheno Demo App' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
        {process.env.NODE_ENV !== 'production' && (
          <script
            dangerouslySetInnerHTML={{ __html: noOverlayWorkaroundScript }}
          />
        )}
      </Head>
      {globalStyles}
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BackgroundImg>
            <BackgroundGradientMask />
            <FirstLoad />
            <AppRibbon />
            <div css={{ position: 'relative', width: '100vw', height: '100%' }}>
              <AnimatePresence initial={false}>
                <Component {...pageProps} key={router.route} />
              </AnimatePresence>
            </div>
          </BackgroundImg>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
