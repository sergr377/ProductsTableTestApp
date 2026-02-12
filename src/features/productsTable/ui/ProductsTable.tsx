import { Table, TableProps } from 'antd';
import { useTableColumns } from '../lib/useTableColumns';
import { Product } from '../../../entities/product';

interface Props {
  products: Product[];
  isLoading?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onChange?: TableProps<Product>['onChange'];
}

export const ProductsTable = ({ products, isLoading, sortBy, sortOrder, onChange }: Props) => {
  const columns = useTableColumns({ sortBy, sortOrder });

  return (
    <Table
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
