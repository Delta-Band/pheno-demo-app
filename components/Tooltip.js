/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import { Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

export default function PhenoTooltip({
  children,
  content,
  placement = 'bottom'
}) {
  return content ? (
    <Tooltip
      title={
        <Typography
          variant='subtitle1'
          css={{
            whiteSpace: 'pre-line'
          }}
        >
          {content}
        </Typography>
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
