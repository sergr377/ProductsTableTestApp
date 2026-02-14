import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/css';
import { Form, Input, Checkbox, Button, Typography, Alert, Avatar, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getAccessToken, setAccessToken } from '../../../shared/lib/auth';

const { Title, Text, Link } = Typography;

const pageStyle = css`
  background-color: var(--color-bg-page);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const cardStyle = css`
  background: var(--color-white);
  border-radius: 40px;
  box-shadow: 0 24px 32px var(--overlay);
  width: 527px;
  height: 716px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const logoContainerStyle = css`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
  margin-top: 48px;
  padding: 0 48px;
`;

const logoStyle = css`
  width: 52px;
  height: 52px;
  background: var(--color-bg-card);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 12px 8px rgba(0, 0, 0, 0.03),
    0 0 0 2px rgba(237, 237, 237, 0.7) inset;
  .ant-avatar {
    background: transparent;
    color: var(--color-bg-logo);
  }
`;

const welcomeTitleStyle = css`
  font-weight: 600;
  font-size: 40px;
  line-height: 1.1;
  color: var(--color-bg-logo);
  text-align: center;
`;

const subtitleStyle = css`
  font-weight: 500;
  font-size: 18px;
  line-height: 1.5;
  color: var(--color-text-subtle);
  text-align: center;
  margin-top: 12px;
  margin-bottom: 30px;
`;

const formItemStyle = css`
  margin-bottom: 12px;
  span {
    font-weight: 500;
    font-size: 18px;
  }
`;

const inputStyle = css`
  width: 400px;
  border-radius: 12px;
  border: 1px solid var(--color-input-border);
  padding: 14px 16px;
  height: auto;
  &:hover,
  &:focus {
    border-color: var(--color-primary);
  }
`;

const buttonStyle = css`
  background: var(--color-primary);
  border: none;
  border-radius: 12px;
  height: 54px;
  font-size: 18px;
  font-weight: 600;
  box-shadow:
    0 8px 8px var(--overlay),
    0 -2px 0 rgba(0, 0, 0, 0.08) inset;
  &:hover {
    background: var(--color-primary-hover);
  }
`;

const dividerStyle = css`
  .ant-divider-inner-text {
    font-size: 16px;
    color: var(--color-text-or);
  }
`;

const linkStyle = css`
  font-size: 18px;
  color: var(--color-text-muted);
  text-align: center;
  display: block;
  u {
    font-size: 18px;
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

        <Title level={1} className={welcomeTitleStyle} style={{ margin: 0 }}>
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
            label={<span>Логин</span>}
            name="username"
            rules={[{ required: true, message: 'Введите логин' }]}
            className={formItemStyle}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'var(--color-bg-logo)', marginRight: 8 }} />}
              placeholder="Логин"
              className={inputStyle}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label={<span>Пароль</span>}
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
            className={formItemStyle}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'var(--color-bg-logo)', marginRight: 8 }} />}
              placeholder="Пароль"
              className={inputStyle}
              size="large"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" className={formItemStyle}>
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

        <Divider style={{ marginTop: 0 }} className={dividerStyle}>
          или
        </Divider>

        {/* Ссылка на создание аккаунта (пока без функционала) */}
        <div className={linkStyle}>
          <Text style={{ fontSize: 18 }}>Нет аккаунта? </Text>
          <Link href="#" underline>
            Создать
          </Link>
        </div>
      </div>
    </div>
  );
};
