import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { CheckoutComponent } from './pages/checkout/checkout';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] }
];
