export const formatPrice = (price: number): string =>
  price.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const formatRating = (rating: number): string => `${rating.toFixed(1)}/5`;

export const generateSku = (id: number): string => `SKU-${id}`;
