/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import DistributionStats from './DistributionStats';
import { useRouter } from 'next/router';
import { fieldsSlice } from '../../redux';
import { useSelector } from 'react-redux';
import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Bar as BarChart } from 'react-chartjs-2';
import moment from 'moment';
import { useWindowSize } from '../../hooks';
import Magnifier from 'react-magnifier';

function Chart({ data, type }) {
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  console.log('data:', data);

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
        backgroundColor: ['rgba(0,0,255,0.8)'],
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
          y: {
            ticks: {
              crossAlign: type === 'categorical' ? 'far' : 'near'
            }
          },
          x: Object.assign(
            {
              grid: {
                display: false
                // drawTicks: false
              },
              min: type === 'categorical' ? 0 : undefined,
              max:
                type === 'categorical' ? data[data.length - 1]?.y : undefined,
              // type: 'category',
              ticks: {
                minRotation: 0,
                maxRotation: 0,
                callback:
                  type === 'categorical'
                    ? undefined
                    : (value, index, ticks) => {
                        if (!data[index]) return;
                        if (type === 'time') {
                          return moment(data[index].x).format('MMM yyyy');
                        } else if (index === 0 || index === data.length - 1) {
                          return data[index].x;
                        }
                      },
                autoSkip: true
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
          display: 'inline-flex'
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
        {field.sampleImage && (
          <motion.div
            css={{
              width,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              background: 'rgba(0, 0, 0, 0.9)',
              boxSizing: 'border-box',
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
              borderRadius: 4
            }}
            animate={{
              padding: selectedView === 'Sample Image' ? '24' : 0,
              opacity: selectedView === 'Sample Image' ? 1 : 0,
              height:
                selectedView === 'Sample Image'
                  ? upTablet
                    ? '55vh'
                    : '75vw'
                  : 50
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
                css={{
                  color: '#f7f7f7',
                  paddingBlock: upTablet ? 16 : 16,
                  margin: 0
                }}
              >
                {field.sampleImage.label}
              </Typography>
            )}
            {field.sampleImage.caption && (
              <Typography
                variant='caption'
                css={{
                  color: '#f7f7f7',
                  paddingBlock: 12,
                  margin: 0,
                  marginTop: -22
                }}
              >
                {field.sampleImage.caption}
              </Typography>
            )}
            <div
              css={{
                width: '100%',
                textAlign: 'center',
                background:
                  'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%)'
              }}
            >
              <Magnifier
                mgWidth={upTablet ? 230 : 150}
                mgHeight={upTablet ? 230 : 150}
                src={`/images/fields/${field.sampleImage.src}`}
                height='calc(55vh - 54px)'
                width='auto'
              />
            </div>
          </motion.div>
        )}
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
                  field.dataDistributionType === 'categorical'
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
            {field.dataDistributionType === 'categorical' ? null : (
              <DistributionStats
                selectedCohort={selectedCohort}
                selectedInstance={selectedInstance}
              />
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
      </motion.div>
    </div>
  );
}

export default GraphContent;
