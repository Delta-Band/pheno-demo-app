/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import Tooltip from '@mui/material/Tooltip';

export default function PhenoTooltip({
  children,
  content,
  placement = 'bottom'
}) {
  return content ? (
    <Tooltip
      title={
        <div
          css={{
            whiteSpace: 'pre-line',
            lineHeight: 1.5,
            textTransform: 'capitalize'
          }}
        >
          {content}
        </div>
      }
      placement={placement}
      enterDelay={500}
    >
      {children}
    </Tooltip>
  ) : (
    children
  );
}
