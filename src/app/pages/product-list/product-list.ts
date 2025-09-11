import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe], 
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];

  constructor(private ps: ProductService, private cart: CartService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.ps.getAll().subscribe(p => {
      this.products = p;
      this.applyFilter();
    });

    this.route.queryParams.subscribe(() => this.applyFilter());
  }

  private applyFilter() {
    const q = this.route.snapshot.queryParamMap.get('q')?.toLowerCase();
    this.filtered = !q
      ? this.products
      : this.products.filter(p =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
  }

  addToCart(p: Product) {
    this.cart.add({ id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl }, 1);
    alert('Added to cart!');
  }
}
