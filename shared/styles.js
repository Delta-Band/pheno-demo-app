import { css, Global, keyframes } from '@emotion/react';
// import styled from '@emotion/styled';

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100vw;
      }
    `}
  />
);

export const tooltip = {
  fontFamily: 'Roboto',
  paddingInline: 24,
  fontSize: '16px !important',
  paddingBlock: 24
};
