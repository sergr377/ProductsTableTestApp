import { Spin } from 'antd';
import { css } from '@emotion/css';

const spinnerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

export const PageSpinner = () => (
  <div className={spinnerStyle}>
    <Spin size="large" tip="Загрузка..." />
  </div>
);
