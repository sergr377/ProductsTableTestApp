import { Typography } from 'antd';
import { css } from '@emotion/css';
import { SearchDropdown } from './SearchDropdown';
import React from 'react';

const { Title } = Typography;

const navCardStyle = css`
  background: white;
  border-radius: 10px;
  padding: 20px 30px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const navLeftStyle = css`
  width: 100%;
  gap: 40px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
`;

const pageTitleStyle = css`
  grid-column: 1;
  font-family: 'Cairo', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #202020;
  margin: 0 !important;
`;

const refreshButtonStyle = css`
  border: 1px solid #ececeb;
  border-radius: 8px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const addButtonStyle = css`
  background: #242edb;
  border: none;
  border-radius: 6px;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background: #1a24b0;
  }
`;

interface Props {
  onRefresh?: () => void;
  onAdd?: () => void;
}

export const Navbar = ({ onRefresh, onAdd }: Props) => {
  const handleProductSelect = (value: string, product: any) => {
    console.log('Выбран товар:', product);
    // Здесь можно добавить навигацию на страницу товара или другое действие
  };

  return (
    <div className={navCardStyle}>
      <div className={navLeftStyle}>
        <Title level={2} className={pageTitleStyle}>
          Товары
        </Title>
        <SearchDropdown placeholder="Найти" onSelect={handleProductSelect} />
      </div>
    </div>
  );
};
