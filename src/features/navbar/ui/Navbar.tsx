import { Input, Space, Button, Typography } from 'antd';
import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
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
  display: flex;
  align-items: center;
  gap: 40px;
`;

const pageTitleStyle = css`
  font-family: 'Cairo', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #202020;
  margin: 0 !important;
`;

const searchInputStyle = css`
  width: 320px;
  .ant-input {
    background-color: #f3f3f3;
    border-radius: 8px;
    border: none;
    &::placeholder {
      color: #999;
    }
  }
  .ant-input-search-button {
    background-color: #f3f3f3;
    border: none;
    color: #999;
  }
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
  return (
    <div className={navCardStyle}>
      <div className={navLeftStyle}>
        <Title level={2} className={pageTitleStyle}>
          Товары
        </Title>
        <Input.Search placeholder="Найти" className={searchInputStyle} allowClear />
      </div>
      <Space size={16}>
        <Button icon={<ReloadOutlined />} className={refreshButtonStyle} onClick={onRefresh} />
        <Button type="primary" icon={<PlusOutlined />} className={addButtonStyle} onClick={onAdd}>
          Добавить
        </Button>
      </Space>
    </div>
  );
};
