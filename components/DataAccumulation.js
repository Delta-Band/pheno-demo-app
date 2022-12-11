import { useState } from 'react';
import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Bar as Chart } from 'react-chartjs-2';

export default function DataAccumulation({ data }) {
  const [cohorts, setCohorts] = useState('all');
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  let datasets = [];

  if (cohorts === 'all') {
    datasets = [
      {
        data: data
          .reduce((acc, cohort) => {
            cohort.instances.forEach(instance => {
              instance.data.forEach(dataPoint => {
                const existingDataPoint = acc.find(
                  itm => itm.x === dataPoint[0]
                );
                if (existingDataPoint) {
                  existingDataPoint.y += dataPoint[1];
                } else {
                  acc.push({ x: dataPoint[0], y: dataPoint[1] });
                }
              });
            });
            // acc.concat(cohort.instances.reduce((ac, instance) => {
            //     instance.data
            //     return ac
            // }, []));
            return acc;
          }, [])
          .sort((a, b) => {
            return a.x > b.x ? 1 : -1;
          })
          .reduce((acc, dataPoint, i) => {
            if (i > 0) {
              acc.push({ x: dataPoint.x, y: dataPoint.y + acc[i - 1].y });
            } else {
              acc.push(dataPoint);
            }
            return acc;
          }, [])
      }
    ];
  }

  return (
    <div
      css={{
        height: upTablet ? '30vw' : '50vw',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Chart
        // datasetIdKey='id'
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
              display: false,
              text: 'Data Accumulation'
            },
            legend: {
              display: false
            }
          },
          scales: {
            // y: {
            //   ticks: {
            //     labelOffset: 0,
            //     padding: 0,
            //     // color: "#000000",
            //     font: {
            //       size: 14
            //     }
            //   },
            //   title: {
            //     display: false,
            //     // text: 'Glucose',
            //     font: {
            //       size: 16
            //     },
            //     padding: {
            //       bottom: 20
            //     }
            //   }
            // },
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
              }
              //   ticks: {
              //     color: '#000000',
              //     padding: 0,
              //     type: 'time',
              //     time: {
              //       displayFormats: {
              //         quarter: 'MMM YYYY'
              //       }
              //     },
              //     font: {
              //       size: 14
              //     }
              //     // callback: (value, index, values) => {
              //     //   if (index === 2 || index === 4) {
              //     //     return 12;
              //     //   }
              //     //   return value;
              //     // }
              //   }
            }
          }
        }}
      />
    </div>
  );
}
