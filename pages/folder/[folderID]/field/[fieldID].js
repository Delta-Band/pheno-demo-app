/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Layout,
  PhenoIcon,
  DataAccumulation,
  DataDistribution
} from '../../../../components';
import { GraphTitle } from '../../../../components/GraphUtils';
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
  FormControl
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getIconByDatType } from '../../../../shared/utils';
import { motion } from 'framer-motion';
import { Bar as BarChart } from 'react-chartjs-2';
import uniq from 'lodash/uniq';
import moment from 'moment';

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

function Filters({
  upTablet,
  field,
  selectedCohort,
  setSelectedCohort,
  selectedInstance,
  setSelectedInstance
}) {
  return (
    <Section>
      <FormControl
        css={{ width: upTablet ? `calc(50% - ${gap / 2}px)` : '100%' }}
      >
        <InputLabel id='cohorts'> Select Cohort</InputLabel>
        <Select
          labelId='cohorts'
          value={selectedCohort}
          onChange={e => setSelectedCohort(e.target.value)}
          input={<OutlinedInput label='Select Cohort' />}
        >
          {field.cohorts.map(opt => (
            <MenuItem key={opt} value={opt}>
              <ListItemText primary={opt} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        css={{ width: upTablet ? `calc(50% - ${gap / 2}px)` : '100%' }}
      >
        <InputLabel id='instances'>Select Instance</InputLabel>
        <Select
          labelId='instances'
          value={selectedInstance}
          onChange={e => setSelectedInstance(e.target.value)}
          input={<OutlinedInput label='Select Instances' />}
        >
          {field.instances.map(opt => (
            <MenuItem key={opt} value={opt}>
              <ListItemText primary={opt} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Section>
  );
}

function Meta({ field }) {
  return (
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
          value={field.cohorts.join(', ')}
        />
        <MetaInfo prefixText='Stability' value={field.stability} />
        <MetaInfo prefixText='Strata' value={field.strata} />
      </Column>
      <Column>
        <MetaInfo iconName='sexed' prefixText='Sexed' value={field.sexed} />
        <MetaInfo
          iconName='tag'
          prefixText='Tags'
          value={<Tags tags={field.tags} />}
        />
      </Column>
    </Section>
  );
}

function Chart({ data, upTablet }) {
  const minMax = data.reduce(
    (acc, point) => {
      if (acc.max < point.x) {
        acc.max = point.x;
      }
      if (acc.min > point.x) {
        acc.min = point.x;
      }
      return acc;
    },
    {
      min: '5000',
      max: ''
    }
  );
  return (
    <BarChart
      css={{
        height: upTablet ? '30vw' : '50vw'
      }}
      data={{
        datasets: [
          {
            data
          }
        ]
      }}
      options={{
        maintainAspectRatio: false,
        layout: {
          padding: 0
        },
        plugins: {
          title: {
            display: false
          },
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: context => context.dataset.label,
              title: context => moment(context[0].raw.x).format('MMM yyyy')
            }
          }
        },
        scales: {
          y: {},
          x: {
            type: 'time',
            time: {
              unit: 'month',
              displayFormats: {
                month: 'MMM yyyy'
              }
            },
            grid: {
              display: false
              // drawTicks: false
            },
            // bounds: 'data',
            ticks: {
              minRotation: 0,
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 5
              // For a category axis, the val is the index so the lookup via getLabelForValue is needed
              // callback: function (val, index) {
              //   const mod = Math.max(data.length / 10, )
              //   return index % 10 === 0 ? moment(val).format('MMM yyyy') : '';
              // }
            }
          }
        }
      }}
    />
  );
}

export default function FieldPage() {
  const router = useRouter();
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  const field = useSelector(state =>
    fieldsSlice.selectors.field(state, router.query.fieldID)
  );
  const [selectedCohort, setSelectedCohort] = useState(field?.cohorts[0] || '');
  const [selectedInstance, setSelectedInstance] = useState(
    field?.instances[0] || ''
  );

  useEffect(() => {
    if (field) {
      setSelectedCohort(field.cohorts[0]);
      setSelectedInstance(field.instances[0]);
    }
  }, [field]);

  const GraphicsContainer = styled.div({
    // width: upTablet ? `calc(50% - ${gap / 2}px)` : '100%',
    width: '100%',
    flexShrink: 0
  });

  function renderInfoGraphics(item) {
    switch (item.type) {
      case 'data-accumulation':
        return (
          <GraphicsContainer key={item.type}>
            <DataAccumulation data={item.dataSets} />
          </GraphicsContainer>
        );
      case 'data-distribution':
        return (
          <GraphicsContainer key={item.type}>
            <DataDistribution data={item.dataSets} />
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
      {field ? (
        <Layout page='field' paddingTop={getPaddingTop()}>
          <Wrapper>
            <Header>{field?.name}</Header>
            <Meta field={field} />
            <Filters
              upTablet={upTablet}
              field={field}
              selectedCohort={selectedCohort}
              setSelectedCohort={setSelectedCohort}
              selectedInstance={selectedInstance}
              setSelectedInstance={setSelectedInstance}
            />
            <Section>
              <Chart
                upTablet={upTablet}
                data={field.dataAccumulation.filter(
                  point =>
                    point.cohort === selectedCohort &&
                    point.instance === selectedInstance
                )}
              />
            </Section>
          </Wrapper>
        </Layout>
      ) : null}
    </>
  ) : null;
}
