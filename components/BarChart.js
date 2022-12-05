/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { Bar } from 'react-chartjs-2';

const Wrapper = styled.div({
  width: '100%'
});

export default function BarChart({ data, title, xLable }) {
  return (
    <Wrapper>
      <Bar
        data={data}
        options={{
          responsive: true,
          backgroundColor: [
            'rgba(27,39,92,0.85)',
            'rgba(35,47,108,0.85)',
            'rgba(44,57,126,0.85)',
            'rgba(56,70,149,0.85)',
            'rgba(63,78,162,0.85)'
          ],
          borderRadius: 4,
          layout: {
            padding: 0
          },
          scales: {
            xAxis: {
              display: false
            },
            yAxis: {
              display: false
            }
          },
          plugins: {
            title: {
              display: false,
              text: 'Users Gained between 2016-2020'
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </Wrapper>
  );
}
