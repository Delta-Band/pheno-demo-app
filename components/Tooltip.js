/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { Tooltip } from '@nextui-org/react';

export default function PhenoTooltip({ children, content }) {
  return (
    <Tooltip content={content} rounded placement='bottom' enterDelay={500}>
      {children}
    </Tooltip>
  );
}
