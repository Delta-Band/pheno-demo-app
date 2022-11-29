import { Tooltip } from '@mui/material';

export default function PhenoTooltip({ children, content }) {
  return (
    <Tooltip title={content} placement='bottom' enterDelay={500}>
      {children}
    </Tooltip>
  );
}
