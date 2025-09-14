import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, Router, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../app/pages/footer/footer';
import { WishlistService } from './services/wishlist.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink, RouterLinkActive, CommonModule, FormsModule, FooterComponent, NgIf],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('store-frontend');

  constructor(public auth: AuthService, 
    public router: Router, 
    private cart: CartService,
    private wishlist: WishlistService
  ) {
    this.cart.count$.subscribe(c => this.cartCount = c);
    this.wishlist.count$.subscribe(c => this.wishlistCount = c);
    const dismissed = localStorage.getItem('demoBannerDismissed');
    this.showBanner = !dismissed;
  }

  toasts: string[] = [];

  searchQuery: string = '';

  wishlistCount = 0;

  cartCount = 0;

  showBanner = true;

  showToast(message: string) {
    this.toasts.push(message);
    setTimeout(() => this.removeToast(message), 3000); 
  }

  removeToast(message: string) {
    this.toasts = this.toasts.filter(m => m !== message);
  }

  dismissBanner() {
    this.showBanner = false;
    localStorage.setItem('demoBannerDismissed', 'true');
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], { queryParams: { q: this.searchQuery } });
      this.searchQuery = '';
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
