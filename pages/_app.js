import { useEffect } from 'react';
import Head from 'next/head';
import { store } from '../redux';
import styled from '@emotion/styled';
import { Provider } from 'react-redux';
import { FirstLoad, AppRibbon } from '../components';
import { globalStyles } from '../shared/styles';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

const BackgroundImg = styled.div({
  position: 'fixed',
  width: '100%',
  height: '100%',
  backgroundImage: 'url(ppl2.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  top: 0
});

const App = ({ Component, pageProps }) => {
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
      </Head>
      {globalStyles}
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BackgroundImg>
            <FirstLoad />
            <AppRibbon />
            <Component {...pageProps} />
          </BackgroundImg>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
