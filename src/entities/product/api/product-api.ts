import { ApiResponse } from '../model/types';
import { apiClient } from '../../../shared/api/base';
import { PRODUCT_SELECT_FIELDS } from '../../../shared/config/constants';

export const productApi = {
  getProducts: (limit: number, skip: number) =>
    apiClient<ApiResponse>(`/products?limit=${limit}&skip=${skip}&select=${PRODUCT_SELECT_FIELDS}`),
};
