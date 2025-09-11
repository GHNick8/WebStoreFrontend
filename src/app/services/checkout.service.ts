import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CreateOrderRequest, OrderResponse } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  constructor(private http: HttpClient) {}
  createOrder(payload: CreateOrderRequest) {
    return this.http.post<OrderResponse>(`${environment.apiBase}/orders`, payload);
  }
  myOrders() {
    return this.http.get<OrderResponse[]>(`${environment.apiBase}/orders/me`);
  }
}
