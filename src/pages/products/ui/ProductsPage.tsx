import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { Alert, Button, ConfigProvider, TablePaginationConfig } from 'antd';
import { DEFAULT_PAGE_SIZE, SORT_STORAGE_KEY } from '../../../shared/config/constants';
import { Product, useProducts } from '../../../entities/product';
import { PageSpinner } from '../../../shared/ui/PageSpinner';
import { Navbar } from '../../../features/navbar';
import { ProductsTable, TablePagination } from '../../../features/productsTable';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { SorterResult } from 'antd/es/table/interface';

const pageStyle = css`
  background-color: #f6f6f6;
  min-height: 100vh;
  padding: 20px 0;
`;

const tableContainerStyle = css`
  background: white;
  border-radius: 12px;
  padding: 24px 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
`;

const tableHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const tableTitleStyle = css`
  font-family: 'Cairo', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: #333;
  margin: 0;
`;

const actionButtonsStyle = css`
  display: flex;
  gap: 8px;
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
// Тип сортировки
type SortState = {
  sortBy?: string;
  order?: 'asc' | 'desc';
};
export const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = DEFAULT_PAGE_SIZE;

  // Состояние сортировки – инициализируем из localStorage
  const [sortState, setSortState] = useState<SortState>(() => {
    const saved = localStorage.getItem(SORT_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  // Сохраняем сортировку в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(SORT_STORAGE_KEY, JSON.stringify(sortState));
  }, [sortState]);

  const skip = (currentPage - 1) * pageSize;
  const { sortBy, order } = sortState;

  const { data, isLoading, isError, error, isFetching, refetch } = useProducts(
    pageSize,
    skip,
    sortBy,
    order
  );

  const products = data?.products ?? [];
  const totalItems = data?.total ?? 0;

  const startItem = totalItems === 0 ? 0 : skip + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  // Обработчик сортировки
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: unknown,
    sorter: SorterResult<Product> | SorterResult<Product>[]
  ) => {
    // Ant может вернуть массив при множественной сортировке, но мы используем одиночную
    const singleSorter = Array.isArray(sorter) ? sorter[0] : sorter;

    let newSortBy: string | undefined;
    let newOrder: 'asc' | 'desc' | undefined;
    if (singleSorter.order) {
      // Маппим dataIndex на поля API
      const fieldMap: Record<string, string> = {
        name: 'title',
        vendor: 'brand',
        rating: 'rating',
        price: 'price',
      };

      const field = singleSorter.field as string;
      newSortBy = fieldMap[field] || field;
      newOrder = singleSorter.order === 'ascend' ? 'asc' : 'desc';
    }

    setSortState({ sortBy: newSortBy, order: newOrder });
    // При изменении сортировки сбрасываем на первую страницу
    setCurrentPage(1);
  };
  const handleRefresh = () => refetch();
  const handleAdd = () => console.log('Добавить товар');

  if (isLoading) return <PageSpinner />;

  if (isError) {
    return (
      <div className={pageStyle}>
        <Alert
          title="Ошибка загрузки данных"
          description={error instanceof Error ? error.message : 'Неизвестная ошибка'}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Inter, sans-serif',
        },
      }}
    >
      <div className={pageStyle}>
        <Navbar onRefresh={handleRefresh} onAdd={handleAdd} />

        <div className={tableContainerStyle}>
          <div className={tableHeaderStyle}>
            <h3 className={tableTitleStyle}>Все позиции</h3>
            <div className={actionButtonsStyle}>
              <Button
                icon={<ReloadOutlined />}
                className={refreshButtonStyle}
                onClick={handleRefresh}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                className={addButtonStyle}
                onClick={handleAdd}
              >
                Добавить
              </Button>
            </div>
          </div>

          <ProductsTable
            products={products}
            isLoading={isFetching}
            sortBy={sortBy}
            sortOrder={order}
            onChange={handleTableChange}
          />

          <TablePagination
            current={currentPage}
            total={totalItems}
            pageSize={pageSize}
            onChange={setCurrentPage}
            startItem={startItem}
            endItem={endItem}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};
