/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import DistributionStats from './DistributionStats';
import { useRouter } from 'next/router';
import { fieldsSlice } from '../../../redux';
import { useSelector } from 'react-redux';
import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Bar as BarChart } from 'react-chartjs-2';
import moment from 'moment';
import { useWindowSize } from '../../../hooks';
import Magnifier from 'react-magnifier';

// window.moment = moment;

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
        backgroundColor: ['rgba(63,78,162,0.7)'],
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
              label: context => context.formattedValue,
              title: context => {
                return type === 'time'
                  ? moment(context[0].parsed.x).format('MMM yyyy')
                  : context[0].label;
              }
            }
          },
          dataLabels: {
            anchor: 'end',
            align: 'end'
          }
        },
        scales: {
          y: {},
          x: Object.assign(
            {
              // min: 3.63503761867407,
              // max: data.length ? data[data.length - 1].x : undefined,
              grid: {
                display: false
                // drawTicks: false
              },
              // includeBounds: true,
              // bounds: 'data',
              ticks: {
                minRotation: 0,
                maxRotation: 0,
                callback: (value, index, ticks) => {
                  if (!data[index]) return;
                  if (type === 'time') {
                    return moment(data[index].x).format('MMM yyyy');
                  } else if (index === 0 || index === data.length - 1) {
                    return data[index].x;
                  }
                }
                // autoSkip: true,
                // autoSkipPadding: 3
              }
            },
            type === 'time'
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
  selectedView,
  selectedCohort,
  selectedInstance,
  views
}) {
  const windowSize = useWindowSize();
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  const width = 'calc(100vw - 72px)';
  const height = upTablet ? 396 : '30vh';
  const router = useRouter();
  const field = useSelector(state =>
    fieldsSlice.selectors.field(state, router.query.fieldID)
  );

  return (
    <div
      css={{
        width: '100%',
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
            animate={{
              opacity: selectedView === 'Data Distribution' ? 1 : 0,
              height:
                selectedView === 'Data Distribution'
                  ? upTablet
                    ? height
                    : 'auto'
                  : 0
            }}
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
            {typeof field.dataDistribution[0].x === 'string' ? null : (
              <DistributionStats />
            )}
          </motion.div>
        )}
        {field.dataAccumulation && (
          <motion.div
            css={{ width, height }}
            animate={{
              opacity: selectedView === 'Data Accumulation' ? 1 : 0
            }}
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
        {field.sampleImage && (
          <motion.div
            css={{
              width,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'black',
              boxSizing: 'border-box',
              borderRadius: 4,
              overflow: 'hidden'
            }}
            animate={{
              padding: selectedView === 'Sample Image' ? '24' : 0,
              opacity: selectedView === 'Sample Image' ? 1 : 0,
              height:
                selectedView === 'Sample Image'
                  ? upTablet
                    ? '55vh'
                    : '60vw'
                  : 0
            }}
            transition={{
              delay: selectedView === 'Sample Image' ? 0 : 0.5,
              type: 'spring',
              damping: 20,
              opacity: {
                delay: 0
              }
            }}
          >
            {field.sampleImage.label && (
              <Typography
                variant='h2'
                css={{ color: '#FFF', paddingBlock: 32, margin: 0 }}
              >
                {field.sampleImage.label}
              </Typography>
            )}
            {field.sampleImage.caption && (
              <Typography
                css={{
                  color: '#FFF',
                  paddingBlock: 12,
                  margin: 0,
                  marginTop: -32
                }}
              >
                {field.sampleImage.caption}
              </Typography>
            )}
            <Magnifier
              mgWidth={upTablet ? 200 : 150}
              mgHeight={upTablet ? 200 : 150}
              src={`/images/fields/${field.sampleImage.src}`}
              height='100%'
              width='auto'
            />
            {/* <img
              css={{
                objectFit: 'contain',
                objectPosition: 'center center',
                height: '100%'
              }}
              src={`/images/fields/${field.sampleImage.src}`}
              alt={field.sampleImage.caption}
            /> */}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default GraphContent;
