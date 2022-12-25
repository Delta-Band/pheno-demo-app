/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function FolderInfo({ mdx }) {
  const theme = useTheme();

  return (
    <div
      css={{
        paddingInline: 32,
        paddingBlock: 24,
        h1: theme.typography.h1,
        h2: theme.typography.h2,
        h3: theme.typography.h3,
        h4: theme.typography.h4,
        h5: theme.typography.h5,
        h6: theme.typography.h6,
        p: theme.typography.p
      }}
    >
      {/* <Typography
        variant='h5'
        css={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        Coming Soon
      </Typography> */}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{mdx.content}</ReactMarkdown>
    </div>
  );
}
