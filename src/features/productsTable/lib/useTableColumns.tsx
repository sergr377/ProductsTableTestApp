import { Checkbox, Space, Button, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Product } from '../../../entities/product';
import { formatPrice } from '../../../shared/lib/format';

import { EllipsisOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import React from 'react';
import { FIELDS_ENUM, NAMES_ENUM } from '../../../shared/config/constants';
import { IconElement } from '../../../shared/ui/IconElement';
interface UseTableColumnsProps {
  sortBy?: FIELDS_ENUM;
  sortOrder?: 'asc' | 'desc';
}
export const useTableColumns = ({
  sortBy,
  sortOrder,
}: UseTableColumnsProps = {}): ColumnsType<Product> => {
  const getSortOrder = (field: FIELDS_ENUM) => {
    if (sortBy === field) {
      return sortOrder === 'asc' ? 'ascend' : 'descend';
    }
  };

  return [
    {
      title: '',
      key: 'checkbox',
      width: 60,
      render: () => (
        <Checkbox style={{ borderRadius: 4, borderColor: 'var(--color-text-light)' }} />
      ),
    },
    {
      title: NAMES_ENUM.NAME,
      key: 'name',
      width: 400,
      sorter: false,
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <Image
            src={record.imageUrl}
            width={48}
            height={48}
            style={{ borderRadius: 8, objectFit: 'cover' }}
            preview={false}
          />
          <div style={{ maxWidth: 400 }}>
            <div
              style={{
                fontFamily: 'Cairo, sans-serif',
                fontWeight: 700,
                fontSize: 16,
                color: 'var(--color-text-secondary)',
                textOverflow: `ellipsis`,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {record.name}
            </div>
            <div
              style={{
                fontFamily: 'Cairo, sans-serif',
                fontSize: 14,
                color: 'var(--color-text-light)',
              }}
            >
              {record.category}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: NAMES_ENUM.VENDOR,
      dataIndex: 'vendor',
      key: 'vendor',
      align: 'center',
      width: 300,
      sorter: true,
      sortOrder: getSortOrder(FIELDS_ENUM.BRAND),
      render: (text) => (
        <span
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: NAMES_ENUM.SKU,
      dataIndex: 'sku',
      key: 'sku',
      align: 'center',
      render: (text) => (
        <span
          style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: 16,
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: NAMES_ENUM.RATING,
      dataIndex: 'rating',
      key: 'rating',
      align: 'center',
      sorter: true,
      sortOrder: getSortOrder(FIELDS_ENUM.RATING),
      render: (text) => {
        const ratingValue = parseFloat(text.split('/')[0]);
        const isLowRating = ratingValue < 4.0;
        return (
          <span
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: 16,
              color: isLowRating ? 'var(--color-error)' : 'var(--color-black)',
            }}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: NAMES_ENUM.PRICE,
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      sorter: true,
      sortOrder: getSortOrder(FIELDS_ENUM.PRICE),
      render: (price) => (
        <span
          style={{
            fontFamily: 'Roboto Mono, monospace',
            fontSize: 16,
            color: 'var(--color-text-secondary)',
          }}
        >
          {formatPrice(price)}
        </span>
      ),
    },
    {
      title: '',
      key: 'actions',
      align: 'right',
      width: 120,
      render: () => (
        <Space size={32}>
          <Button
            type="text"
            icon={<IconElement name="Cross" size={'auto'} />}
            style={{
              background: 'var(--color-primary)',
              color: 'var(--color-white)',
              borderRadius: 23,
              width: 52,
              height: 27,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
          <Button
            type="text"
            icon={<IconElement name="ThreeDots" fill={'var(--color-text-light)'} size={'auto'} />}
            style={{ fontSize: 24, color: 'var(--color-text-primary)' }}
          />
        </Space>
      ),
    },
  ];
};
