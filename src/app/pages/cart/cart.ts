import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class CartComponent {
  constructor(private cart: CartService) {}

  get items(): CartItem[] { return this.cart.getCart().items; }
  get total(): number { return this.cart.getCart().total; }

  inc(i: CartItem) { this.cart.setQuantity(i.id, i.quantity + 1); }
  dec(i: CartItem) { this.cart.setQuantity(i.id, i.quantity - 1); }
  remove(i: CartItem) { this.cart.remove(i.id); }
  clear() { this.cart.clear(); }
}
