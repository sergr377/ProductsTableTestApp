import { Table, TableProps } from 'antd';
import { useTableColumns } from '../lib/useTableColumns';
import { Product } from '../../../entities/product';
import { css } from '@emotion/css';

interface Props {
  products: Product[];
  isLoading?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onChange?: TableProps<Product>['onChange'];
}
const tableStyle = css`
  th {
    color: var(--color-text-light) !important;
    background-color: var(--color-white) !important;
  }
`;
export const ProductsTable = ({ products, isLoading, sortBy, sortOrder, onChange }: Props) => {
  const columns = useTableColumns({ sortBy, sortOrder });

  return (
    <Table
      className={tableStyle}
      rowKey="id"
      columns={columns}
      dataSource={products}
      pagination={false}
      loading={isLoading}
      onChange={onChange}
      style={{ fontFamily: 'inherit' }}
    />
  );
};
