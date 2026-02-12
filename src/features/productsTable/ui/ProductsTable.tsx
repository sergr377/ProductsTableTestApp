import { Table } from 'antd';
import { useTableColumns } from '../lib/useTableColumns';
import { Product } from '../../../entities/product';

interface Props {
  products: Product[];
  isLoading?: boolean;
}

export const ProductsTable = ({ products, isLoading }: Props) => {
  const columns = useTableColumns();

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={products}
      pagination={false}
      loading={isLoading}
      style={{ fontFamily: 'inherit' }}
    />
  );
};
