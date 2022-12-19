/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Layout } from '../../../../components';
import {
  Meta,
  DistributionStats
} from '../../../../components/fieldPageComponents';
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
import { motion } from 'framer-motion';
import { Bar as BarChart } from 'react-chartjs-2';
import moment from 'moment';
import { useWindowSize } from '../../../../hooks';

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

function Section({ children, justifyCenter = false, style = {} }) {
  return (
    <div
      css={[
        {
          // width: '100%',
          display: 'flex',
          justifyContent: justifyCenter ? 'center' : 'flex-start',
          gap,
          marginBottom: gap,
          flexWrap: 'wrap',
          flexShrink: 0,
          position: 'relative'
        },
        style
      ]}
    >
      {children}
    </div>
  );
}

function Filters({
  upTablet,
  field,
  selectedCohort,
  setSelectedCohort,
  selectedInstance,
  setSelectedInstance,
  selectedView,
  setSelectedView,
  views
}) {
  const windowSize = useWindowSize();
  const width = upTablet
    ? Math.floor((windowSize.width - gap * 2 - 72) / 3)
    : '100%';
  return (
    <>
      <FormControl css={{ width }}>
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
      <FormControl css={{ width }}>
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
      {selectedView ? (
        <FormControl css={{ width }}>
          <InputLabel id='graphType'>Select View</InputLabel>
          <Select
            labelId='graphType'
            value={selectedView}
            onChange={e => setSelectedView(e.target.value)}
            input={<OutlinedInput label='Select View' />}
          >
            {views.map(graph => (
              <MenuItem key={graph} value={graph}>
                <ListItemText primary={graph} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : null}
    </>
  );
}

function Chart({ data, type }) {
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));

  return (
    <BarChart
      css={{ height: upTablet ? 380 : '30vh' }}
      data={{
        labels: data.map(point => point.x),
        datasets: [
          {
            data: data.map(point => point.y)
          }
        ]
      }}
      options={{
        maintainAspectRatio: false,
        indexAxis: type === 'categorical' ? 'y' : 'x',
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
              title: context =>
                type === 'accumulation'
                  ? moment(context[0].raw.x).format('MMM yyyy')
                  : context[0].raw.x
            }
          }
        },
        scales: {
          y: {},
          x: Object.assign(
            {
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
                //   return moment(val).format('MMM yyyy');
                // }
              }
            },
            type === 'accumulation'
              ? {
                  type: type,
                  time: {
                    unit: 'month',
                    displayFormats: {
                      month: 'MMM yyyy'
                    }
                  }
                }
              : {}
          )
        }
      }}
    />
  );
}

function GraphContent({
  field,
  selectedView,
  selectedCohort,
  selectedInstance,
  views
}) {
  const windowSize = useWindowSize();
  const width = 'calc(100vw - 72px)';
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));

  return (
    <div
      css={{
        width: '100%',
        // height: '50vh',
        overflow: 'hidden'
      }}
    >
      <motion.div
        css={{
          display: 'inline-flex',
          height: '100%'
        }}
        animate={{
          x:
            (windowSize.width - 72) *
            -1 *
            views.findIndex(g => g === selectedView)
        }}
        transition={{
          type: 'spring',
          damping: 20
        }}
      >
        {field.dataDistribution && (
          <motion.div
            animate={{ opacity: selectedView === 'Data Distribution' ? 1 : 0 }}
            css={{
              width,
              display: 'flex',
              alignItems: 'center',
              flexDirection: upTablet ? 'row' : 'column'
            }}
          >
            <div css={{ width: '100%' }}>
              <Chart
                type={
                  typeof field.dataDistribution[0].x === 'string'
                    ? 'categorical'
                    : 'distribution'
                }
                data={field.dataDistribution.filter(
                  point =>
                    point.cohort === selectedCohort &&
                    point.instance === selectedInstance
                )}
              />
            </div>
            <DistributionStats />
          </motion.div>
        )}
        {field.dataAccumulation && (
          <motion.div
            css={{ width, height: upTablet ? undefined : '30vh' }}
            animate={{ opacity: selectedView === 'Data Accumulation' ? 1 : 0 }}
          >
            <Chart
              type='time'
              data={field.dataAccumulation.filter(
                point =>
                  point.cohort === selectedCohort &&
                  point.instance === selectedInstance
              )}
            />
          </motion.div>
        )}
      </motion.div>
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
  const [selectedCohort, setSelectedCohort] = useState(field?.cohorts[0] || '');
  const views = [];
  if (field?.dataDistribution) {
    views.push('Data Distribution');
  }
  if (field?.dataAccumulation) {
    views.push('Data Accumulation');
  }
  const [selectedView, setSelectedView] = useState(views ? views[0] : null);
  const [selectedInstance, setSelectedInstance] = useState(
    field?.instances[0] || ''
  );

  useEffect(() => {
    if (field) {
      setSelectedCohort(field.cohorts[0]);
      setSelectedInstance(field.instances[0]);
      if (!selectedView) {
        setSelectedView(views[0]);
      }
    }
  }, [field]);

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

  function Description({ text }) {
    return (
      <Section>
        <Typography>{text}</Typography>
      </Section>
    );
  }

  return (
    <>
      <Head>
        <title>Pheno Demo App</title>
      </Head>
      {field ? (
        <Layout page='field' paddingTop={getPaddingTop()}>
          <Wrapper>
            <Header>{field?.name}</Header>
            <Description text={field.description} />
            <Meta />
            <Section>
              <Filters
                upTablet={upTablet}
                field={field}
                selectedCohort={selectedCohort}
                setSelectedCohort={setSelectedCohort}
                selectedInstance={selectedInstance}
                setSelectedInstance={setSelectedInstance}
                selectedView={selectedView}
                setSelectedView={setSelectedView}
                views={views}
              />
              <GraphContent
                upTablet={upTablet}
                field={field}
                views={views}
                selectedView={selectedView}
                selectedCohort={selectedCohort}
                selectedInstance={selectedInstance}
              />
            </Section>
          </Wrapper>
        </Layout>
      ) : null}
    </>
  );
}
