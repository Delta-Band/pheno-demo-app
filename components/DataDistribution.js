import { useState } from 'react';
import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Bar as Chart } from 'react-chartjs-2';
import { GraphTitle } from './GraphUtils';
import uniq from 'lodash/uniq';
import { filter } from 'lodash';
import moment from 'moment';

export default function DataDistribution({ data }) {
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  const cohorts = data.map(set => set.cohort);
  const instances = data.reduce((acc, set) => {
    acc = uniq(acc.concat(set.instances.map(instance => instance.name)));
    return acc;
  }, []);
  const [filters, setFilters] = useState({
    cohorts,
    instances
  });

  const datasets = data.reduce((acc, cohort) => {
    if (filters.cohorts.includes(cohort.cohort)) {
      cohort.instances
        .filter(instance => filters.instances.includes(instance.name))
        .forEach(instance => {
          instance.data.forEach(dataPoint => {
            const existingDataPoint = acc.find(itm => itm.x === dataPoint[0]);
            if (existingDataPoint) {
              existingDataPoint.y += dataPoint[1];
            } else {
              acc.push({ x: dataPoint[0], y: dataPoint[1] });
            }
          });
        });
    }
    return acc;
  }, []);

  return (
    <>
      <GraphTitle
        onChange={filtered => {
          setFilters({
            cohorts: filtered[0],
            instances: filtered[1]
          });
        }}
        filters={[
          {
            name: 'Cohorts',
            options: cohorts
          },
          {
            name: 'Instances',
            options: instances
          }
        ]}
      >
        Data Distribution
      </GraphTitle>
      <div
        css={{
          height: upTablet ? '30vw' : '50vw',
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Chart
          data={{
            datasets
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
                grid: {
                  display: false
                }
              }
            }
          }}
        />
      </div>
    </>
  );
}
