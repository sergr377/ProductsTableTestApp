import React, { useState, useEffect } from 'react';
import { AutoComplete, Spin, Input } from 'antd';
import { css } from '@emotion/css';
import { useDebounce } from '../../../shared/lib/hooks/useDebounce';
import { useProductSearch } from '../../../entities/product/model/hooks';

// Стили для обёртки и дропдауна
const dropdownWrapperStyle = css`
  grid-column: 2; /* помещаем во вторую колонку */
  justify-self: center;
  width: 50%;
  .ant-select-dropdown {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 8px 0;
  }
  .ant-select-item {
    padding: 10px 16px;
    transition: background 0.2s;
    &:hover {
      background-color: var(--color-bg-input);
    }
  }
  .ant-select-item-option-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const optionTitleStyle = css`
  font-size: 14px;
  color: var(--color-text-secondary);
`;

const optionPriceStyle = css`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  font-family: 'Roboto Mono', monospace;
`;

const noResultsStyle = css`
  padding: 12px 16px;
  text-align: center;
  color: var(--color-text-placeholder);
`;

interface SearchDropdownProps {
  placeholder?: string;
  onSelect?: (value: string, product: any) => void;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  placeholder = 'Найти',
  onSelect,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounce(inputValue, 300);

  const { data, isLoading, isFetching } = useProductSearch(debouncedQuery, 10);

  useEffect(() => {
    setOpen(debouncedQuery.length >= 2);
  }, [debouncedQuery]);

  const options =
    data?.products.map((product) => ({
      key: product.id,
      value: product.title,
      label: (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span className={optionTitleStyle}>{product.title}</span>
          <span className={optionPriceStyle}>
            {product.price.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} $
          </span>
        </div>
      ),
      product,
    })) ?? [];

  const handleSelect = (value: string, option: any) => {
    setInputValue(value);
    setOpen(false);
    onSelect?.(value, option.product);
  };

  const dropdownRender = (menu: React.ReactElement) => {
    if (isLoading || isFetching) {
      return (
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <Spin size="small" />
        </div>
      );
    }
    if (!options.length && debouncedQuery.length >= 2) {
      return <div className={noResultsStyle}>Ничего не найдено</div>;
    }
    return menu;
  };

  return (
    <div className={dropdownWrapperStyle}>
      <AutoComplete
        value={inputValue}
        onChange={setInputValue}
        onSelect={handleSelect}
        options={options}
        open={open}
        onOpenChange={setOpen}
        popupRender={dropdownRender}
        style={{ width: '100%', maxHeight: 400, overflowY: 'auto' }}
        popupMatchSelectWidth={true}
        variant={'filled'}
        allowClear={true}
        size={'large'}
        placeholder={placeholder}
      />
    </div>
  );
};
