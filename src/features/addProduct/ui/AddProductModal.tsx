import React from 'react';
import { Modal, Form, Input, InputNumber, message } from 'antd';

interface AddProductModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess?: () => void;
}

interface FormValues {
  name: string;
  price: number;
  vendor: string;
  sku: string;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({ open, onCancel, onSuccess }) => {
  const [form] = Form.useForm<FormValues>();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // Имитация успешного добавления (без вызова API)
      console.log('Добавлен товар:', values);
      message.success('Товар успешно добавлен');
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      // Валидация не пройдена – ничего не делаем, форма не закроется
    }
  };

  return (
    <Modal
      title="Добавить товар"
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      okText="Добавить"
      cancelText="Отмена"
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ name: '', price: 0, vendor: '', sku: '' }}
      >
        <Form.Item
          name="name"
          label="Наименование"
          rules={[{ required: true, message: 'Введите наименование' }]}
        >
          <Input placeholder="Наименование товара" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Цена, ₽"
          rules={[{ required: true, message: 'Введите цену' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
            parser={(value) => Number(value?.replace(/\s/g, '')) as number}
          />
        </Form.Item>

        <Form.Item
          name="vendor"
          label="Вендор"
          rules={[{ required: true, message: 'Введите вендора' }]}
        >
          <Input placeholder="Вендор" />
        </Form.Item>

        <Form.Item
          name="sku"
          label="Артикул"
          rules={[{ required: true, message: 'Введите артикул' }]}
        >
          <Input placeholder="Артикул" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
