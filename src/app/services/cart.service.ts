import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';

const KEY = 'cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private load(): Cart {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) as Cart : { items: [], total: 0 };
  }

  private save(cart: Cart) {
    cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    localStorage.setItem(KEY, JSON.stringify(cart));
  }

  getCart(): Cart {
    return this.load();
  }

  clear() {
    localStorage.removeItem(KEY);
  }

  add(item: Omit<CartItem, 'quantity'>, qty: number = 1) {
    const cart = this.load();
    const existing = cart.items.find(i => i.id === item.id);
    if (existing) existing.quantity += qty;
    else cart.items.push({ ...item, quantity: qty });
    this.save(cart);
  }

  setQuantity(productId: number, qty: number) {
    const cart = this.load();
    const it = cart.items.find(i => i.id === productId);
    if (!it) return;
    it.quantity = Math.max(1, qty);
    this.save(cart);
  }

  remove(productId: number) {
    const cart = this.load();
    cart.items = cart.items.filter(i => i.id !== productId);
    this.save(cart);
  }

  count(): number {
    return this.load().items.reduce((n, i) => n + i.quantity, 0);
  }
}
