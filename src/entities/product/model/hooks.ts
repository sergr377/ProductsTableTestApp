import { useQuery } from '@tanstack/react-query';
import { productApi } from '../api/product-api';
import { ApiProduct, Product } from './types';
import { formatRating, generateSku } from '../../../shared/lib/format';

// Маппер с API на внутреннюю модель
const mapApiProductToProduct = (apiProduct: ApiProduct): Product => ({
  id: apiProduct.id,
  name: apiProduct.title,
  category: apiProduct.category,
  vendor: apiProduct.brand || 'Не указан',
  sku: generateSku(apiProduct.id),
  rating: formatRating(apiProduct.rating),
  price: apiProduct.price,
  imageUrl: apiProduct.thumbnail,
});

export const useProducts = (
  limit: number,
  skip: number,
  sortBy?: string,
  order?: 'asc' | 'desc'
) => {
  return useQuery({
    queryKey: ['products', limit, skip, sortBy, order],
    queryFn: async () => {
      const data = await productApi.getProducts(limit, skip, sortBy, order);
      return {
        products: data.products.map(mapApiProductToProduct),
        total: data.total,
      };
    },
    placeholderData: (prev) => prev,
  });
};

export const useProductSearch = (query: string, limit = 10) => {
  return useQuery({
    queryKey: ['productSearch', query, limit],
    queryFn: () => productApi.searchProducts(query, limit),
    enabled: query.length >= 2, // запускаем запрос только если >=2 символов
    placeholderData: (prev) => prev,
  });
};
