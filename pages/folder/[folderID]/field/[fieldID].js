/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { useState } from 'react';
import Head from 'next/head';
import { Layout, PhenoIcon } from '../../../../components';
import { useRouter } from 'next/router';
import { fieldsSlice } from '../../../../redux';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import {
  Typography,
  useMediaQuery,
  OutlinedInput,
  InputLabel,
  MenuItem,
  ListItemText,
  Select,
  Checkbox,
  FormControl
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getIconByDatType } from '../../../../shared/utils';
import { FormattedNumber as IntlNumber } from 'react-intl';
import { DataAccumulation } from '../../../../components';
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

const Header = ({ children }) => {
  return (
    <Typography
      variant='h5'
      css={{
        marginBottom: 24
      }}
    >
      {children}
    </Typography>
  );
};

const Section = styled.div({
  width: '100%',
  display: 'flex',
  gap,
  marginBottom: gap,
  flexWrap: 'wrap'
});

const Column = styled.div({
  display: 'inline-flex',
  flexDirection: 'column',
  gap: 18
});

const MetaInfo = ({ iconName, prefixText, value }) => {
  return (
    <div
      css={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 18,
        '& .pheno-icon': {
          width: 24
        }
      }}
    >
      {iconName && <PhenoIcon name={iconName} />}
      <Typography>{prefixText}:</Typography>
      {typeof value === 'string' ? (
        <Typography>
          <b>{value}</b>
        </Typography>
      ) : (
        value
      )}
    </div>
  );
};

function Tags({ tags }) {
  return (
    <div css={{ display: 'flex' }}>
      {tags.map((tag, i) => (
        <div key={tag} css={{ display: 'flex' }}>
          <Typography>
            <b>{tag}</b>
          </Typography>
          {i < tags.length - 1 ? (
            <Typography css={{ marginInline: 8 }}>/</Typography>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function GraphTitle({ children, filters = [] }) {
  const [filtered, setFiltered] = useState(
    filters.map(filter => {
      return filter.options;
    })
  );

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 24,
        height: 46,
        gap: 16
      }}
    >
      <Typography variant='h6'>{children}</Typography>
      {filters.map((filter, i) => (
        <FormControl key={filter.name}>
          <InputLabel id='demo-multiple-checkbox-label'>
            {filter.name}
          </InputLabel>
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            multiple
            value={filtered[i]}
            onChange={e => {
              setFiltered(filtered => {
                filtered[i] = e.target.value;
                return filtered;
              });
            }}
            input={<OutlinedInput label={filter.name} />}
            renderValue={selected => selected.join(', ')}
          >
            {filter.options.map(opt => (
              <MenuItem key={opt} value={opt}>
                <Checkbox checked={filtered[i].includes(opt)} />
                <ListItemText primary={opt} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </div>
  );
}

export default function FieldPage() {
  const router = useRouter();
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  const field = useSelector(state =>
    fieldsSlice.selectors.field(state, router.query.fieldID)
  );

  const GraphicsContainer = styled.div({
    width: upTablet ? `calc(50% - ${gap / 2}px)` : '100%',
    flexShrink: 0
  });

  function renderInfoGraphics(item) {
    switch (item.type) {
      case 'data-accumulation':
        return (
          <GraphicsContainer key={item.type}>
            <GraphTitle
              filters={[
                {
                  name: 'Cohorts',
                  options: item.dataSets.map(set => set.cohort)
                }
              ]}
            >
              Data Accumulation
            </GraphTitle>
            <DataAccumulation data={item.dataSets} />
          </GraphicsContainer>
        );
      case 'image':
        return (
          <GraphicsContainer key={item.type}>
            <GraphTitle>{item.imageTitle}</GraphTitle>
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
          <Header>{field?.name}</Header>
          <Section>
            <Column>
              <MetaInfo
                iconName={getIconByDatType(field.type)}
                prefixText='Data Type'
                value={field.type}
              />
              <MetaInfo
                iconName='user'
                prefixText='Participants'
                value={field.participants}
              />
              <MetaInfo
                iconName='meter'
                prefixText='Measurements'
                value={field.measurements}
              />
            </Column>
            <Column>
              <MetaInfo
                iconName='group'
                prefixText='Cohorts'
                value={field.cohorts}
              />
              <MetaInfo prefixText='Stability' value={field.meta.stability} />
              <MetaInfo prefixText='Strata' value={field.meta.strata} />
            </Column>
            <Column>
              <MetaInfo prefixText='Sexed' value={field.meta.sexed} />
              <MetaInfo
                prefixText='Tags'
                value={<Tags tags={field.meta.tags} />}
              />
            </Column>
          </Section>
          <Section>{field.meta.infoGraphics.map(renderInfoGraphics)}</Section>
        </Wrapper>
      </Layout>
    </>
  ) : null;
}
