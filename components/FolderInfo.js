/** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';

export default function FolderInfo({ mdx }) {
  const theme = useTheme();

  return (
    <div
      css={{
        paddingInline: 32,
        paddingBlockStart: '0.5rem',
        h1: Object.assign({}, theme.typography.h5, {
          marginTop: '1.5rem'
        }),
        p: Object.assign({}, theme.typography.body1, {
          paddingBlockEnd: '0.5rem'
        }),
        ol: Object.assign({}, theme.typography.body1, {
          paddingInlineStart: 20
        }),
        li: Object.assign({}, theme.typography.body1, {
          paddingBlockEnd: '0.5rem'
        }),
        img: {
          marginBlock: '1rem',
          maxWidth: '100%'
        }
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
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          [remarkRehype, { allowDangerousHtml: true }]
        ]}
      >
        {mdx.content}
      </ReactMarkdown>
    </div>
  );
}
