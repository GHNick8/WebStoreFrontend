export interface CreateOrderRequest {
  items: { productId: number; quantity: number }[];
}

export interface OrderResponse {
  id: number;
  status: string;
  total: number;
  createdAt: string;
  items: { productId: number; name: string; quantity: number; price: number }[];
}