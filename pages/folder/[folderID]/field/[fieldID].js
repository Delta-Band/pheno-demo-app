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
import { Meta } from '../../../../components/filedPageComponets';
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
  FormControl,
  Button,
  Tabs as MuiTabs,
  Tab as MuiTab
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getIconByDatType } from '../../../../shared/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Bar as BarChart } from 'react-chartjs-2';
import uniq from 'lodash/uniq';
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
  selectedGraph,
  setSelectedGraph,
  graphs
}) {
  const windowSize = useWindowSize();
  const width = upTablet ? windowSize.width / 3 - gap * 2 : '100%';
  return (
    <Section>
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
      {selectedGraph ? (
        <FormControl css={{ width }}>
          <InputLabel id='graphType'>Select Graph</InputLabel>
          <Select
            labelId='graphType'
            value={selectedGraph}
            onChange={e => setSelectedGraph(e.target.value)}
            input={<OutlinedInput label='Select Graph' />}
          >
            {graphs.map(graph => (
              <MenuItem key={graph} value={graph}>
                <ListItemText primary={graph} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : null}
    </Section>
  );
}

function Chart({ data, type }) {
  // const minMax = data.reduce(
  //   (acc, point) => {
  //     if (acc.max < point.x) {
  //       acc.max = point.x;
  //     }
  //     if (acc.min > point.x) {
  //       acc.min = point.x;
  //     }
  //     return acc;
  //   },
  //   {
  //     min: '5000',
  //     max: ''
  //   }
  // );
  return (
    <BarChart
      // css={{
      //   height: upTablet ? windowSize.height / 4 : windowSize.height / 2
      // }}
      data={{
        labels: data.map(point => point.x),
        datasets: [
          {
            data: data.map(point => point.y)
          }
        ]
      }}
      options={{
        maintainAspectRatio: true,
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
  selectedGraph,
  selectedCohort,
  selectedInstance,
  graphs
}) {
  const windowSize = useWindowSize();
  const width = 'calc(100vw - 64px)';

  return (
    <div css={{ width: '100%', height: '50vh', overflow: 'hidden' }}>
      <motion.div
        css={{
          display: 'inline-flex',
          height: '100%'
        }}
        animate={{
          x:
            (windowSize.width - 64) *
            -1 *
            graphs.findIndex(g => g === selectedGraph)
        }}
        transition={{
          type: 'spring',
          damping: 20
        }}
      >
        {field.dataDistribution && (
          <div css={{ width }}>
            <Chart
              type='distribution'
              data={field.dataDistribution.filter(
                point =>
                  point.cohort === selectedCohort &&
                  point.instance === selectedInstance
              )}
            />
          </div>
        )}
        {field.categorical && (
          <div css={{ width }}>
            <Chart
              type='categorical'
              data={field.categorical.filter(
                point =>
                  point.cohort === selectedCohort &&
                  point.instance === selectedInstance
              )}
            />
          </div>
        )}
        {field.dataAccumulation && (
          <div css={{ width }}>
            <Chart
              type='accumulation'
              type='time'
              data={field.dataAccumulation.filter(
                point =>
                  point.cohort === selectedCohort &&
                  point.instance === selectedInstance
              )}
            />
          </div>
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
  const graphs = [];
  if (field?.dataDistribution) {
    graphs.push('Data Distribution');
  }
  if (field?.categorical) {
    graphs.push('Categorical');
  }
  if (field?.dataAccumulation) {
    graphs.push('Data Accumulation');
  }
  const [selectedGraph, setSelectedGraph] = useState(graphs ? graphs[0] : null);
  const [selectedInstance, setSelectedInstance] = useState(
    field?.instances[0] || ''
  );

  useEffect(() => {
    if (field) {
      setSelectedCohort(field.cohorts[0]);
      setSelectedInstance(field.instances[0]);
      if (!selectedGraph) {
        setSelectedGraph(graphs[0]);
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

  return (
    <>
      <Head>
        <title>Pheno Demo App</title>
      </Head>
      {field ? (
        <Layout page='field' paddingTop={getPaddingTop()}>
          <Wrapper>
            <Header>{field?.name}</Header>
            <Meta />
            <Filters
              upTablet={upTablet}
              field={field}
              selectedCohort={selectedCohort}
              setSelectedCohort={setSelectedCohort}
              selectedInstance={selectedInstance}
              setSelectedInstance={setSelectedInstance}
              selectedGraph={selectedGraph}
              setSelectedGraph={setSelectedGraph}
              graphs={graphs}
            />
            <GraphContent
              field={field}
              graphs={graphs}
              selectedGraph={selectedGraph}
              selectedCohort={selectedCohort}
              selectedInstance={selectedInstance}
            />
          </Wrapper>
        </Layout>
      ) : null}
    </>
  );
}
