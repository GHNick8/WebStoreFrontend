import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { WishlistService } from '../../services/wishlist.service';
import { WishlistItem } from '../../models/wishlist.model';
import { CartService } from '../../services/cart.service';
import { App } from '../../app';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './wishlist.html', 
  styleUrls: ['./wishlist.scss']
})
export class WishlistComponent implements OnInit {
  items: WishlistItem[] = [];

  constructor(private wishlist: WishlistService, 
    private cart: CartService,
    private app: App,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.items = this.wishlist.getItems();
  }

  remove(id: number) {
    this.wishlist.remove(id);
    this.items = this.wishlist.getItems();
    this.app.showToast('Item removed from wishlist.');
  }

  moveToCart(item: WishlistItem) {
    this.cart.add({ id: item.id, name: item.name, price: item.price, imageUrl: item.imageUrl }, 1);
    this.remove(item.id);
    this.app.showToast(`${item.name} moved to cart.`);
  }

  clear() {
    this.wishlist.clear();
    this.items = [];
    this.app.showToast('Wishlist cleared.');
  }
}
