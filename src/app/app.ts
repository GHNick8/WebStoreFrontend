import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/">WebStore</a>
        <div class="navbar-nav">
          <a class="nav-link" routerLink="/">Products</a>
          <a class="nav-link" routerLink="/checkout">Checkout</a>
          <a class="nav-link" routerLink="/login">Login</a>
          <a class="nav-link" routerLink="/register">Register</a>
        </div>
      </div>
    </nav>

    <div class="container mt-3">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
