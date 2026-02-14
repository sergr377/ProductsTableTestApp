import { Pagination, Typography } from 'antd';
import { css } from '@emotion/css';

const { Text } = Typography;

const footerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;

const paginationInfoStyle = css`
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  color: var(--color-text-primary);
`;

const paginationStyle = css`
  .ant-pagination-item {
    border-radius: 4px;
    border: 1px solid var(--color-border);
    background: var(--color-white);
    a {
      color: var(--color-text-primary);
    }
    &-active {
      background: var(--color-primary-light);
      border-color: var(--color-primary-light);
      a {
        color: var(--color-white);
      }
    }
  }
  .ant-pagination-prev,
  .ant-pagination-next {
    .ant-pagination-item-link {
      border: 1px solid var(--color-border);
      border-radius: 4px;
      color: var(--color-text-primary);
    }
  }
`;

interface Props {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
  startItem: number;
  endItem: number;
}

export const TablePagination = ({
  current,
  total,
  pageSize,
  onChange,
  startItem,
  endItem,
}: Props) => {
  if (total === 0) return null;

  return (
    <div className={footerStyle}>
      <Text className={paginationInfoStyle}>
        Показано {startItem}-{endItem} из {total}
      </Text>
      <Pagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        showSizeChanger={false}
        className={paginationStyle}
      />
    </div>
  );
};
