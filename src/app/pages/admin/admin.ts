import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  onSale: boolean;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss']
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  newProduct: Partial<Product> = {};

  constructor(private http: HttpClient, public auth: AuthService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<Product[]>(`${environment.apiBase}/products`)
      .subscribe(res => this.products = res);
  }

  addProduct() {
    this.http.post<Product>(`${environment.apiBase}/products`, this.newProduct)
      .subscribe(() => {
        this.newProduct = {};
        this.loadProducts();
      });
  }

  toggleSale(product: Product) {
    const updated = { ...product, onSale: !product.onSale };
    this.http.put(`${environment.apiBase}/products/${product.id}`, updated)
      .subscribe(() => this.loadProducts());
  }

  updateStock(product: Product) {
    const updated = { ...product };
    this.http.put(`${environment.apiBase}/products/${product.id}`, updated)
      .subscribe(() => this.loadProducts());
  }
}
