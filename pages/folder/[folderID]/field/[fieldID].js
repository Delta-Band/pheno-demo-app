/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import Head from 'next/head';
import { Layout, PhenoIcon } from '../../../../components';
import { useRouter } from 'next/router';
import { fieldsSlice } from '../../../../redux';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getIconByDatType } from '../../../../shared/utils';
import { FormattedNumber as IntlNumber } from 'react-intl';
import { BarChart } from '../../../../components';
import { motion } from 'framer-motion';

const gap = 36;

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
  display: 'flex',
  justifyContent: 'space-between',
  gap,
  marginBottom: gap,
  flexWrap: 'wrap'
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
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  const field = useSelector(state =>
    fieldsSlice.selectors.field(state, router.query.fieldID)
  );
  // const minimizeRibbon = useSelector(state => state.layout.minimizeRibbon);

  const GraphicsContainer = styled.div({
    width: upTablet ? `calc(50% - ${gap / 2}px)` : '100%',
    flexShrink: 0
  });

  function renderInfoGraphics(item) {
    switch (item.type) {
      case 'histogram':
        return (
          <GraphicsContainer key={item.histoData.title}>
            <BarChart
              title={item.histoData.title}
              data={{
                datasets: [
                  {
                    label: item.histoData.xLabel,
                    data: item.histoData.values.map(dataPoint => dataPoint[1])
                  }
                ],
                labels: item.histoData.values.map(dataPoint => dataPoint[0])
              }}
            />
          </GraphicsContainer>
        );
      case 'image':
        return (
          <GraphicsContainer key={item.imageTitle}>
            <motion.div
              css={{
                overflow: 'hidden',
                borderRadius: 4
              }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: upTablet ? '30vw' : '50vw', opacity: 1 }}
              transition={{
                delay: 1,
                type: 'spring',
                // stiffness: 50,
                damping: 30
              }}
            >
              <img
                alt={item.imageTitle}
                src={item.imageUrl}
                css={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center'
                }}
              />
            </motion.div>
          </GraphicsContainer>
        );
      default:
        return null;
    }
  }

  function getPaddingTop() {
    switch (true) {
      // case minimizeRibbon:
      //   return 60;
      case upTablet:
        return 110;
      case !upTablet:
        return 224;
    }
  }

  return field ? (
    <>
      <Head>
        <title>Pheno Demo App</title>
      </Head>
      <Layout page='field' paddingTop={getPaddingTop()}>
        <Wrapper>
          <Typography
            variant='h6'
            css={{
              marginBottom: 24
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
            {/* <Column>
              <InfoGraphics collection={field.meta.infoGraphics} />
            </Column> */}
          </Section>
          <Section>{field.meta.infoGraphics.map(renderInfoGraphics)}</Section>
        </Wrapper>
      </Layout>
    </>
  ) : null;
}
