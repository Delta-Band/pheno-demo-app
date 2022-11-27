import { useEffect } from 'react';
import Head from 'next/head';
import { store } from '../redux';
import { Provider } from 'react-redux';
import { FirstLoad, AppRibbon } from '../components';
// import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { NextUIProvider, globalCss, styled } from '@nextui-org/react';

const BackgroundImg = styled('div', {
  position: 'fixed',
  width: '100%',
  height: '100%',
  backgroundImage: 'url(ppl2.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  top: 0
});

const BackgroundGradientMask = styled('div', {
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  background:
    'linear-gradient(142.62deg, rgba(24, 24, 24, 0.56) 38.07%, rgba(48, 48, 48, 0.46) 80%)',
  backdropFilter: 'blur(1px)'
});

const globalStyles = globalCss({
  body: {
    padding: 0,
    margin: 0,
    height: '100%',
    width: '100vw'
  },
  html: {
    padding: 0,
    margin: 0,
    height: '100%',
    width: '100vw'
  }
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
  globalStyles();

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
      <Provider store={store}>
        {/* <ThemeProvider theme={theme}> */}
        <NextUIProvider theme={theme}>
          <BackgroundImg>
            <BackgroundGradientMask />
            <FirstLoad />
            <AppRibbon />
            <Component {...pageProps} />
          </BackgroundImg>
        </NextUIProvider>
        {/* </ThemeProvider> */}
      </Provider>
    </>
  );
};

export default App;
