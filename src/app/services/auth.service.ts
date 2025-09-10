import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.models';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwt';

  constructor(private http: HttpClient) {}

  login(req: LoginRequest) {
    return this.http.post<AuthResponse>(`${environment.apiBase}/auth/login`, req).pipe(
      tap(res => localStorage.setItem(this.tokenKey, res.token))
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
}
