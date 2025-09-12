import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

const KEY = 'cart';

@Injectable({ providedIn: 'root' })
export class CartService {

  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  constructor() {
    this.updateCount(); 
  }


  private load(): Cart {
    const raw = localStorage.getItem(KEY);
    try {
      const parsed = raw ? JSON.parse(raw) as Cart : null;
      if (!parsed || !parsed.items) {
        return { items: [], total: 0 };
      }
      return parsed;
    } catch {
      return { items: [], total: 0 };
    }
  }

  private save(cart: Cart) {
    cart.total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    localStorage.setItem(KEY, JSON.stringify(cart));
    this.updateCount();
  }

  private updateCount() {
    const cart = this.load();
    const c = cart.items.reduce((n, i) => n + i.quantity, 0);
    this.countSubject.next(c);
  }

  getCart(): Cart {
    return this.load();
  }

  clear() {
    localStorage.removeItem(KEY);
    this.updateCount();
  }

  add(item: Omit<CartItem, 'quantity'>, qty: number = 1) {
    const cart = this.load();

    if (!cart.items) {
      cart.items = [];
    }

    const existing = cart.items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.items.push({ ...item, quantity: qty });
    }

    this.save(cart);
  }

  setQuantity(productId: number, qty: number) {
    const cart = this.load();
    if (!cart.items) return;

    const it = cart.items.find(i => i.id === productId);
    if (!it) return;

    it.quantity = Math.max(1, qty);
    this.save(cart);
  }

  remove(productId: number) {
    const cart = this.load();
    if (!cart.items) return;

    cart.items = cart.items.filter(i => i.id !== productId);
    this.save(cart);
  }

  count(): number {
    return this.load().items.reduce((n, i) => n + i.quantity, 0);
  }
}