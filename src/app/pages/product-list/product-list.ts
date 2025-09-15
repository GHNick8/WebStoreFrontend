import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { App } from '../../app';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe], 
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];

  pageSize = 9;
  currentPage = 1;
  totalPages = 1;

  constructor(private ps: ProductService, 
    private cart: CartService, 
    private app: App, 
    private route: ActivatedRoute, 
    private wishlist: WishlistService
  ) {}

  ngOnInit() {
    this.ps.getAll().subscribe(p => {
      this.products = p;
      this.applyFilter();
      this.totalPages = Math.ceil(this.filtered.length / this.pageSize);
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
    this.app.showToast(`${p.name} added to cart!`);
  }

  addToWishlist(p: Product) {
    this.wishlist.add({ id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl });
    this.app.showToast(`${p.name} added to wishlist.`);
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
