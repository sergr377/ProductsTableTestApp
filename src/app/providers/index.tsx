import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { queryClient } from './query-client';
import ruRU from 'antd/locale/ru_RU';
import { GlobalStyles } from '../styles/GlobalStyles';

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <GlobalStyles />
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Inter, sans-serif',
        },
      }}
      locale={ruRU}
    >
      {children}
    </ConfigProvider>
  </QueryClientProvider>
);
