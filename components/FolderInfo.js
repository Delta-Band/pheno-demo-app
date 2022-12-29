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
        paddingBlock: 32,
        h1: Object.assign({}, theme.typography.h1, {}),
        h2: Object.assign({}, theme.typography.h2, {}),
        h3: Object.assign({}, theme.typography.h3, {}),
        h4: Object.assign({}, theme.typography.h4, {}),
        h5: Object.assign({}, theme.typography.h5, {}),
        h6: Object.assign({}, theme.typography.h6, {}),
        p: Object.assign({}, theme.typography.body1, {}),
        ol: Object.assign({}, theme.typography.body1, {
          paddingInlineStart: 20
        })
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
