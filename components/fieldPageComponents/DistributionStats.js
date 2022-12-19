/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';

function Key({ children }) {
  return <Typography>{children}</Typography>;
}

function Value({ children }) {
  return <Typography>{children}</Typography>;
}

const inverted = {
  background: 'rgba(0, 0, 0, 0.05)'
};

export default function DistributionStats() {
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));

  return (
    <ul
      css={{
        width: upTablet ? 300 : '100%',
        flexShrink: 0,
        border: '1px solid white',
        borderRadius: 10,
        overflow: 'hidden',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        marginInlineStart: upTablet ? 24 : 0,
        marginTop: upTablet ? 0 : 24,
        boxSizing: 'border-box',
        background: 'rgba(255, 255, 255, 0.1)',
        '& > li': {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 45,
          paddingInline: 24
        }
      }}
    >
      <li>
        <Key>Count</Key>
        <Value>10</Value>
      </li>
      <li css={inverted}>
        <Key>Minimum</Key>
        <Value>10</Value>
      </li>
      <li>
        <Key>Maximum</Key>
        <Value>10</Value>
      </li>
      <li css={inverted}>
        <Key>Mean</Key>
        <Value>10</Value>
      </li>
      <li>
        <Key>Standard Deviation</Key>
        <Value>10</Value>
      </li>
      <li css={inverted}>
        <Key>Median</Key>
        <Value>10</Value>
      </li>
      <li>
        <Key>Percental 90</Key>
        <Value>10</Value>
      </li>
      <li css={inverted}>
        <Key>Percental 10</Key>
        <Value>10</Value>
      </li>
    </ul>
  );
}
