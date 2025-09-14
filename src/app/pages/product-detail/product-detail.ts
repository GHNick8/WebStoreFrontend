import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../models/product.model';
import { App } from '../../app';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss']
})
export class ProductDetailComponent implements OnInit {
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private ps: ProductService,
    private cart: CartService,
    private wishlist: WishlistService,
    private app: App
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ps.getById(id).subscribe(p => this.product = p);
  }

  addToCart() {
    if (this.product) {
      this.cart.add(this.product, 1);
      this.app.showToast(`${this.product.name} added to cart.`);
    }
  }

  addToWishlist() {
    if (this.product) {
      this.wishlist.add({
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        imageUrl: this.product.imageUrl
      });
      this.app.showToast(`♡ ${this.product.name} added to wishlist.`);
    }
  }
}
