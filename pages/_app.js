import { useEffect } from 'react';
import Head from 'next/head';
import { store } from '../redux';
import { Provider } from 'react-redux';
import { FirstLoad } from '../components';

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
      <Provider store={store}>
        <FirstLoad />
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default App;
