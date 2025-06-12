import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import type { AuthResponse } from '../interfaces/auth-response.interface';
import { environment } from 'src/environments/environment';
import type { AuthStatus } from '../interfaces/auth-status.type';
import { User } from '../interfaces/user.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private authStatus = signal<AuthStatus>('checking');
  private user = signal<User | null>(null);
  private token = signal<string | null>(null);

  checkStatusResource = rxResource({
    loader: () => this.checkStatus(),
  });

  public getAuthStatus = computed<AuthStatus>(() => {
    if (this.authStatus() === 'checking') return 'checking';
    if (this.user()) return 'authenticated';
    return 'not-authenticated';
  });

  isAdminUser = computed(() => {
    if (!this.user()) return false;
    return this.user()!.roles.includes('admin');
  });

  public getUser = computed<User | null>(() => this.user());
  public getToken = computed<string | null>(() => this.token());

  public login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${environment.API_URL}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((response) =>
          this.setResponses('authenticated', response.user, response.token)
        ),
        catchError((error: any) => {
          this.logout();
          return of(false);
        })
      );
  }

  public register(
    email: string,
    password: string,
    fullName: string
  ): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${environment.API_URL}/auth/register`, {
        email,
        password,
        fullName,
      })
      .pipe(
        map((response) =>
          this.setResponses('authenticated', response.user, response.token)
        ),
        catchError((error: any) => {
          this.logout();
          return of(false);
        })
      );
  }

  public checkStatus(): Observable<boolean> {
    console.log('Me llaman');
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No hay token');
      this.logout();
      return of(false);
    }
    console.log('Token:', token);

    return this.http
      .get<AuthResponse>(`${environment.API_URL}/auth/check-status`)
      .pipe(
        tap((response) => console.log('Response check-status:', response)),
        map((response) =>
          this.setResponses('authenticated', response.user, response.token)
        ),
        catchError((error: any) => {
          console.log('Error check-status:', error);
          this.logout();
          return of(false);
        })
      );
  }

  private setResponses(authStatus: AuthStatus, user: User, token: string) {
    this.authStatus.set(authStatus);
    this.user.set(user);
    this.token.set(token);
    localStorage.setItem('token', token);
    return true;
  }

  public logout() {
    this.authStatus.set('not-authenticated');
    this.user.set(null);
    this.token.set(null);
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
