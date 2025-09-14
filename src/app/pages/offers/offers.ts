import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { App } from '../../app';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './offers.html',
  styleUrls: ['./offers.scss']
})
export class OffersComponent implements OnInit {
  products: Product[] = [];
  offers: Product[] = [];

  constructor(
    private ps: ProductService,
    private cart: CartService,
    private wishlist: WishlistService,
    private app: App
  ) {}

  ngOnInit(): void {
    this.ps.getAll().subscribe(prods => {
      this.products = prods;
      this.offers = prods.filter(p => p.onSale === true);
    });
  }

  addToCart(p: Product) {
    this.cart.add(p, 1);
    this.app.showToast(`${p.name} added to cart.`);
  }

  addToWishlist(p: Product) {
    this.wishlist.add({
      id: p.id,
      name: p.name,
      price: p.price,
      imageUrl: p.imageUrl
    });
    this.app.showToast(`♡ ${p.name} added to wishlist.`);
  }
}
