/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import React from 'react';
import styled from '@emotion/styled';
import { Line as LineChart } from 'react-chartjs-2';
import { Typography } from '@mui/material';

function IntroGraph({ data, meta }) {
  return <LineChart chartData={{}} />;
}

export default function FolderInfo() {
  return (
    <div>
      <Typography
        variant='h5'
        css={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        Coming Soon
      </Typography>
      {/* <IntroGraph
        data={[
          { x: '2021-11-06 00:00:00', y: '90' },
          { x: '2021-11-06 01:30:00', y: '95' },
          { x: '2021-11-06 02:00:00', y: '100' },
          { x: '2021-11-06 03:00:00', y: '98' },
          { x: '2021-11-06 04:00:00', y: '97' },
          { x: '2021-11-06 05:00:00', y: '110' },
          { x: '2021-11-06 06:00:00', y: '115' },
          { x: '2021-11-06 07:00:00', y: '120' },
          { x: '2021-11-06 08:00:00', y: '118' },
          { x: '2021-11-06 09:00:00', y: '122' },
          { x: '2021-11-07 00:00:00', y: '140' }
        ]}
        meta={{}}
      /> */}
    </div>
  );
}
