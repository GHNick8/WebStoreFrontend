import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.models';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwt';
  private roleKey = 'role';

  constructor(private http: HttpClient) {}

  login(req: LoginRequest) {
    return this.http.post<AuthResponse>(`${environment.apiBase}/auth/login`, req).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.token);
        localStorage.setItem('role', res.role); 
        localStorage.setItem("userEmail", res.email);
      })
    );
  }

  register(req: RegisterRequest) {
    return this.http.post(`${environment.apiBase}/auth/register`, req);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  get token() {
    return localStorage.getItem(this.tokenKey);
  }

  get isLoggedIn() {
    return !!this.token;
  }

  get isAdmin(): boolean {
    return localStorage.getItem(this.roleKey) === 'ROLE_ADMIN';
  }

  get userEmail(): string | null {
    return localStorage.getItem("userEmail");
  }

}
