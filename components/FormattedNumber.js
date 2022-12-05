import React from 'react';
import { FormattedNumber as IntlNumber } from 'react-intl';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function FormattedNumber({ value }) {
  const theme = useTheme();
  const upTablet = useMediaQuery(theme.breakpoints.up('tablet'));

  return (
    <IntlNumber
      value={value}
      notation='compact'
      roundingMode='ceil'
      style='decimal'
      maximumFractionDigits={upTablet ? 1 : 0}
    />
  );
}
