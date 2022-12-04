/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import Head from 'next/head';
import { Layout } from '../../../../components';

export default function FieldPage() {
  return (
    <>
      <Head>
        <title>Pheno Demo App</title>
      </Head>
      <Layout page='field' paddingTop={110}>
        Field Page
      </Layout>
    </>
  );
}
