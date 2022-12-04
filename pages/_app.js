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
import { IntlProvider } from 'react-intl'; // locale-data for en

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

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  // useEffect(() => {
  //   if (process.env.NODE_ENV === 'production') return;
  //   window.addEventListener('error', event => {
  //     event.stopImmediatePropagation();
  //   });
  //   window.addEventListener('unhandledrejection', event => {
  //     event.stopImmediatePropagation();
  //   });
  // }, []);

  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {globalStyles}
      <IntlProvider locale='en'>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <BackgroundImg>
              <BackgroundGradientMask />
              <FirstLoad />
              <div
                css={{
                  position: 'relative',
                  width: '100vw',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <AppRibbon />
                <AnimatePresence initial={false}>
                  <Component {...pageProps} key={router.route} />
                </AnimatePresence>
              </div>
            </BackgroundImg>
          </ThemeProvider>
        </Provider>
      </IntlProvider>
    </>
  );
};

export default App;
