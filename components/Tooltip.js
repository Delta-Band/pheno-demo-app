import Tooltip from '@mui/material/Tooltip';

export default function PhenoTooltip({ children, content }) {
  return (
    <Tooltip title={content} placement='bottom' enterDelay={500}>
      {children}
    </Tooltip>
  );
}
