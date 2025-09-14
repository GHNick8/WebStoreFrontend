import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Product[]>(`${environment.apiBase}/products`);
  }

  getOne(id: number) {
    return this.http.get<Product>(`${environment.apiBase}/products/${id}`);
  }

  create(p: Product) {
    return this.http.post<Product>(`${environment.apiBase}/products`, p);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiBase}/products/${id}`);
  }

}
