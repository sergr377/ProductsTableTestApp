import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { queryClient } from './query-client';
import ruRU from 'antd/locale/ru_RU';

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ConfigProvider locale={ruRU}>{children}</ConfigProvider>
  </QueryClientProvider>
);
