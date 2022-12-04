/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import Head from 'next/head';
import { Layout, PhenoIcon } from '../../../../components';
import { useRouter } from 'next/router';
import { fieldsSlice } from '../../../../redux';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { getIconByDatType } from '../../../../shared/utils';
import { FormattedNumber as IntlNumber } from 'react-intl';

const Wrapper = styled.div({
  width: '100%',
  paddingInline: 32,
  paddingBlock: 24,
  display: 'inline-flex',
  flexDirection: 'column',
  boxSizing: 'border-box'
});

const Section = styled.div({
  width: '100%',
  display: 'flex'
});

const Column = styled.div({
  display: 'inline-flex',
  flexDirection: 'column',
  gap: 18
});

const MetaInfo = styled.div({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 18,
  '& .pheno-icon': {
    width: 24
  }
});

export default function FieldPage() {
  const router = useRouter();
  const field = useSelector(state =>
    fieldsSlice.selectors.field(state, router.query.fieldID)
  );

  return field ? (
    <>
      <Head>
        <title>Pheno Demo App</title>
      </Head>
      <Layout page='field' paddingTop={110}>
        <Wrapper>
          <Typography
            variant='h6'
            css={{
              marginBottom: 18
            }}
          >
            {field?.name}
          </Typography>
          <Section>
            <Column>
              <MetaInfo>
                <PhenoIcon name={getIconByDatType(field.type)} />
                <Typography>
                  Data Type: <b>{field.type}</b>
                </Typography>
              </MetaInfo>
              <MetaInfo>
                <PhenoIcon name='user' />
                <Typography>
                  Participants:&nbsp;
                  <b>
                    <IntlNumber value={field.participants} />
                  </b>
                </Typography>
              </MetaInfo>
              <MetaInfo>
                <PhenoIcon name='meter' />
                <Typography>
                  Measurements:&nbsp;
                  <b>
                    <IntlNumber value={field.measurements} />
                  </b>
                </Typography>
              </MetaInfo>
            </Column>
            <Column></Column>
          </Section>
        </Wrapper>
      </Layout>
    </>
  ) : null;
}
