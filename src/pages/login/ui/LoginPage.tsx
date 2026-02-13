import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/css';
import { Form, Input, Checkbox, Button, Typography, Alert, Avatar, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getAccessToken, setAccessToken } from '../../../shared/lib/auth';

const { Title, Text, Link } = Typography;

const pageStyle = css`
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const cardStyle = css`
  background: white;
  border-radius: 40px;
  box-shadow: 0 24px 32px rgba(0, 0, 0, 0.04);
  padding: 48px;
  width: 527px;
  max-width: 90%;
`;

const logoContainerStyle = css`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`;

const logoStyle = css`
  width: 52px;
  height: 52px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 12px 8px rgba(0, 0, 0, 0.03),
    0 0 0 2px rgba(237, 237, 237, 0.7) inset;
  .ant-avatar {
    background: transparent;
    color: #232323;
  }
`;

const welcomeTitleStyle = css`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 40px;
  line-height: 1.1;
  color: #232323;
  text-align: center;
  margin-bottom: 0;
`;

const subtitleStyle = css`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.5;
  color: #e0e0e0;
  text-align: center;
  margin-bottom: 32px;
`;

const formItemStyle = css`
  margin-bottom: 16px;
`;

const inputStyle = css`
  border-radius: 12px;
  border: 1px solid #ededed;
  padding: 14px 16px;
  height: auto;
  &:hover,
  &:focus {
    border-color: #242edb;
  }
`;

const checkboxStyle = css`
  margin-bottom: 20px;
  .ant-checkbox-inner {
    border-radius: 4px;
    border-color: #b2b3b9;
  }
`;

const buttonStyle = css`
  background: #242edb;
  border: none;
  border-radius: 12px;
  height: 54px;
  font-size: 18px;
  font-weight: 600;
  box-shadow:
    0 8px 8px rgba(0, 0, 0, 0.04),
    0 -2px 0 rgba(0, 0, 0, 0.08) inset;
  &:hover {
    background: #1a24b0;
  }
`;

const dividerStyle = css`
  margin: 24px 0;
  .ant-divider-inner-text {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    color: #ebebeb;
  }
`;

const linkStyle = css`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: #6c6c6c;
  text-align: center;
  display: block;
  & .ant-typography {
    color: #242edb;
    font-weight: 600;
    text-decoration: underline;
  }
`;

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Если уже есть токен — редирект на /products
  useEffect(() => {
    if (getAccessToken()) {
      navigate('/products');
    }
  }, [navigate]);

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          expiresInMins: 30,
        }),
        // credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Неверный логин или пароль');
      }

      // Сохраняем токен в нужном хранилище
      setAccessToken(data.accessToken, values.remember);

      // Редирект на страницу товаров
      navigate('/products');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={pageStyle}>
      <div className={cardStyle}>
        <div className={logoContainerStyle}>
          <div className={logoStyle}>
            <Avatar size={40} icon={<UserOutlined />} />
          </div>
        </div>

        <Title level={2} className={welcomeTitleStyle}>
          Добро пожаловать!
        </Title>
        <Text className={subtitleStyle}>Пожалуйста, авторизируйтесь</Text>

        {error && (
          <Alert
            title={error}
            type="error"
            showIcon
            style={{ marginBottom: 24, borderRadius: 8 }}
          />
        )}

        <Form
          name="login"
          initialValues={{
            username: 'michaelw',
            password: 'michaelwpass',
            remember: false,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Введите логин' }]}
            className={formItemStyle}
          >
            <Input
              prefix={<UserOutlined style={{ color: '#232323', marginRight: 8 }} />}
              placeholder="Логин"
              className={inputStyle}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
            className={formItemStyle}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#232323', marginRight: 8 }} />}
              placeholder="Пароль"
              className={inputStyle}
              size="large"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" className={checkboxStyle}>
            <Checkbox>Запомнить данные</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={buttonStyle}
              loading={loading}
              block
            >
              Войти
            </Button>
          </Form.Item>
        </Form>

        <Divider className={dividerStyle}>или</Divider>

        {/* Ссылка на создание аккаунта (пока без функционала) */}
        <div className={linkStyle}>
          <Text>Нет аккаунта? </Text>
          <Link href="#" underline>
            Создать
          </Link>
        </div>
      </div>
    </div>
  );
};
