import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { CreateOrderRequest } from '../../models/order.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss']
})
export class CheckoutComponent {
  placing = false;
  error: string | null = null;

  constructor(private cart: CartService, private co: CheckoutService, private router: Router) {}

  get items() { return this.cart.getCart().items; }
  get total() { return this.cart.getCart().total; }

  placeOrder() {
    this.error = null;
    if (!this.items.length) { this.error = 'Your cart is empty.'; return; }

    const payload: CreateOrderRequest = {
      items: this.items.map(i => ({ productId: i.id, quantity: i.quantity }))
    };

    this.placing = true;
    this.co.createOrder(payload).subscribe({
      next: () => {
        this.cart.clear();
        this.router.navigate(['/']); // or to an order confirmation page
      },
      error: (e) => {
        this.error = e?.error?.error || 'Failed to place order';
        this.placing = false;
      }
    });
  }
}
