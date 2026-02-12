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
  color: #333;
`;

const paginationStyle = css`
  .ant-pagination-item {
    border-radius: 4px;
    border: 1px solid #ececeb;
    background: white;
    a {
      color: #333;
    }
    &-active {
      background: #797fea;
      border-color: #797fea;
      a {
        color: white;
      }
    }
  }
  .ant-pagination-prev,
  .ant-pagination-next {
    .ant-pagination-item-link {
      border: 1px solid #ececeb;
      border-radius: 4px;
      color: #333;
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
