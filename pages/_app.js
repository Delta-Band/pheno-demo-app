import { useEffect } from 'react';
import Head from 'next/head';
import { store } from '../redux';
import styled from '@emotion/styled';
import { Provider } from 'react-redux';
import { FirstLoad, AppRibbon } from '../components';
import { globalStyles } from '../shared/styles';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import ReactTooltip from 'react-tooltip';
import { tooltip } from '../shared/styles';

const BackgroundImg = styled.div({
  position: 'fixed',
  width: '100%',
  height: '100%',
  backgroundImage: 'url(ppl2.jpg)',
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
    'linear-gradient(142.62deg, rgba(24, 24, 24, 0.56) 38.07%, rgba(48, 48, 48, 0.46) 80%)',
  backdropFilter: 'blur(1px)'
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
      <ReactTooltip
        css={tooltip}
        effect='solid'
        delayShow={500}
        place='bottom'
        border
        borderColor='#5c5c5c'
      />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BackgroundImg>
            <BackgroundGradientMask />
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
