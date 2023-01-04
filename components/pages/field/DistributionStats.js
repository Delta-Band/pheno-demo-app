/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { fieldsSlice } from '../../../redux';
import { useSelector } from 'react-redux';

function Key({ children }) {
  return <Typography>{children}</Typography>;
}

function Value({ children }) {
  return <Typography css={{ fontWeight: 'bold' }}>{children}</Typography>;
}

const inverted = {
  // background: 'rgba(0, 0, 0, 0.1)'
};

export default function DistributionStats({
  selectedCohort,
  selectedInstance
}) {
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));
  const router = useRouter();
  const field = useSelector(state =>
    fieldsSlice.selectors.field(state, router.query.fieldID)
  );
  const distributionStats = useSelector(state =>
    fieldsSlice.selectors.distributionStats(state, {
      filedID: router.query.fieldID,
      selectedCohort,
      selectedInstance
    })
  ) || { stats: {} };
  const { count, min, max, mean, std, median, percentile90, percentile10 } =
    distributionStats.stats;

  return (
    <ul
      css={{
        width: upTablet ? 300 : '100%',
        cursor: 'default',
        flexShrink: 0,
        border: '1px solid #a6a5a2',
        borderRadius: 4,
        overflow: 'hidden',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        marginInlineStart: upTablet ? 24 : 0,
        marginTop: upTablet ? 0 : 24,
        boxSizing: 'border-box',
        paddingBlock: 8,
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
        <Value>{count}</Value>
      </li>
      <li css={inverted}>
        <Key>Minimum</Key>
        <Value>{min}</Value>
      </li>
      <li>
        <Key>Maximum</Key>
        <Value>{max}</Value>
      </li>
      <li css={inverted}>
        <Key>Mean</Key>
        <Value>{mean}</Value>
      </li>
      <li>
        <Key>Standard Deviation</Key>
        <Value>{std}</Value>
      </li>
      <li css={inverted}>
        <Key>Median</Key>
        <Value>{median}</Value>
      </li>
      <li css={inverted}>
        <Key>10th Percentile</Key>
        <Value>{percentile10}</Value>
      </li>
      <li>
        <Key>90th Percentile</Key>
        <Value>{percentile90}</Value>
      </li>
    </ul>
  );
}
