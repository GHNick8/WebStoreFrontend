import { Injectable } from '@angular/core';
import { WishlistItem } from '../models/wishlist.model';
import { BehaviorSubject } from 'rxjs';

const KEY = 'wishlist';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private items: WishlistItem[] = this.load();
  private countSubject = new BehaviorSubject<number>(this.items.length);

  count$ = this.countSubject.asObservable();

  private load(): WishlistItem[] {
    const raw = localStorage.getItem(KEY);
    try {
      return raw ? (JSON.parse(raw) as WishlistItem[]) : [];
    } catch {
      return [];
    }
  }

  private save(items: WishlistItem[]) {
    localStorage.setItem(KEY, JSON.stringify(items));
    this.items = items;
    this.countSubject.next(items.length); 
  }

  getItems(): WishlistItem[] {
    return this.items;
  }

  add(item: WishlistItem) {
    if (!this.items.find(i => i.id === item.id)) {
      const updated = [...this.items, item];
      this.save(updated);
    }
  }

  remove(productId: number) {
    const updated = this.items.filter(i => i.id !== productId);
    this.save(updated);
  }

  clear() {
    this.save([]); 
  }

  count(): number {
    return this.items.length;
  }
}
