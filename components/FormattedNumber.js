import React from 'react';
import { FormattedNumber as IntlNumber } from 'react-intl';

export default function FormattedNumber({ value }) {
  return (
    <IntlNumber
      value={value}
      notation='compact'
      roundingMode='ceil'
      style='decimal'
      maximumFractionDigits={1}
    />
  );
}
