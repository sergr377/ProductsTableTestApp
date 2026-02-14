import { Button, Typography } from 'antd';
import { css } from '@emotion/css';
import { SearchDropdown } from './SearchDropdown';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../../../shared/lib/auth';

const { Title } = Typography;

const navCardStyle = css`
  background: var(--color-white);
  border-radius: 10px;
  padding: 20px 30px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px var(--overlay);
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
  color: var(--color-text-dark);
  margin: 0 !important;
`;

const logoutButtonStyle = css`
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px; /* небольшой отступ от соседних кнопок */
`;
interface Props {
  onRefresh?: () => void;
  onAdd?: () => void;
}

export const Navbar = ({ onRefresh, onAdd }: Props) => {
  const navigate = useNavigate();
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
      <Button className={logoutButtonStyle} onClick={() => handleLogout(navigate)} title="Выйти">
        Выйти
      </Button>
    </div>
  );
};
