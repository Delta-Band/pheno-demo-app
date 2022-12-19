/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { motion } from 'framer-motion';
import { Bar as BarChart } from 'react-chartjs-2';
import moment from 'moment';
import { useWindowSize } from '../../hooks';
import { useRouter } from 'next/router';

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
  selectedGraph,
  selectedCohort,
  selectedInstance,
  graphs
}) {
  const router = useRouter();
  const field = useSelector(state =>
    fieldsSlice.selectors.field(state, router.query.fieldID)
  );
  const windowSize = useWindowSize();
  const width = 'calc(100vw - 72px)';

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

export default GraphContent;
