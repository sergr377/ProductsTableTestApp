import { Global, css } from '@emotion/react';

const common = css`
  --color-primary: #242edb;
  --color-primary-hover: #1a24b0;
  --color-primary-light: #797fea;
  --color-bg-page: #f6f6f6;
  --color-bg-card: #ffffff;
  --color-bg-input: #f3f3f3;
  --color-bg-image-placeholder: #c4c4c4;
  --color-bg-logo: #232323;
  --color-border: #ececeb;
  --color-border-table: #e2e2e2;
  --color-input-border: #ededed;
  --color-text-dark: #202020;
  --color-text-primary: #333333;
  --color-text-secondary: #222222;
  --color-text-light: #b2b3b9;
  --color-text-muted: #6c6c6c;
  --color-text-placeholder: #999999;
  --color-text-or: #ebebeb;
  --color-checkbox-label: #9c9c9c;
  --color-text-subtle: #e0e0e0;
  --color-error: #f11010;
  --color-success: #52c41a;
  --color-icon-secondary: #c9c9c9;
  --color-button-outline: #367aff;
  --color-white: #ffffff;
  --color-black: #000000;
  --overlay: rgba(0, 0, 0, 0.04);

  /* Цвета для полупрозрачных информационных блоков */
  --color-overlay-bg: rgba(255, 255, 255, 0.7);
  --color-overlay-text: #000000;

  /* Цвета для полупрозрачных блоков с поддержкой тем */
  --color-overlay-bg-light: rgba(255, 255, 255, 0.5);
  --color-overlay-bg-dark: rgba(0, 0, 0, 0.5);
`;
export const GlobalStyles = () => (
  <Global
    styles={css`
      :root {
        ${common}
      }
    `}
  />
);
