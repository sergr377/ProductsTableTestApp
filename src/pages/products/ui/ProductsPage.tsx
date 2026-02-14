import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { Alert, Button, TablePaginationConfig } from 'antd';
import { DEFAULT_PAGE_SIZE, SORT_STORAGE_KEY } from '../../../shared/config/constants';
import { Product, useProducts } from '../../../entities/product';
import { PageSpinner } from '../../../shared/ui/PageSpinner';
import { Navbar } from '../../../features/navbar';
import { ProductsTable, TablePagination } from '../../../features/productsTable';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { SorterResult } from 'antd/es/table/interface';
import { AddProductModal } from '../../../features/addProduct';

const pageStyle = css`
  background-color: var(--color-bg-page);
  min-height: 100vh;
  padding: 20px 0;
`;

const tableContainerStyle = css`
  background: var(--color-white);
  border-radius: 12px;
  padding: 24px 30px;
  box-shadow: 0 4px 12px var(--overlay);
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
  color: var(--color-text-primary);
  margin: 0;
`;

const actionButtonsStyle = css`
  display: flex;
  gap: 8px;
`;

const refreshButtonStyle = css`
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const addButtonStyle = css`
  background: var(--color-primary);
  border: none;
  border-radius: 6px;
  color: var(--color-white);
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background: var(--color-primary-hover);
  }
`;
// Тип сортировки
type SortState = {
  sortBy?: string;
  order?: 'asc' | 'desc';
};
export const ProductsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddSuccess = () => {
    setIsAddModalOpen(false);
    // Здесь можно, например, обновить список товаров, но по условию не требуется
  };

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
    <div className={pageStyle}>
      <Navbar onRefresh={handleRefresh} onAdd={handleAddClick} />

      <AddProductModal
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onSuccess={handleAddSuccess}
      />
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
              onClick={handleAddClick}
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
  );
};
