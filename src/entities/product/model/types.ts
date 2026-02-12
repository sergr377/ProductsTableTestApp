export interface ApiProduct {
  id: number;
  title: string;
  price: number;
  brand: string;
  category: string;
  rating: number;
  thumbnail: string;
}

export interface ApiResponse {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  vendor: string;
  sku: string;
  rating: string;
  price: number;
  imageUrl: string;
}
