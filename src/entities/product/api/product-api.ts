import { ApiResponse } from '../model/types';
import { apiClient } from '../../../shared/api/base';
import { PRODUCT_SELECT_FIELDS } from '../../../shared/config/constants';

export const productApi = {
  getProducts: (limit: number, skip: number, sortBy?: string, order?: 'asc' | 'desc') => {
    let url = `/products?limit=${limit}&skip=${skip}&select=${PRODUCT_SELECT_FIELDS}`;
    if (sortBy && order) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }
    return apiClient<ApiResponse>(url);
  },

  searchProducts: (q: string, limit = 10) =>
    apiClient<ApiResponse>(`/products/search?q=${encodeURIComponent(q)}&limit=${limit}`),
};
