import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginDTO } from '../../models/Authentication/LoginDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl: string = environment.baseUrl;
  private apiUrl = `${this.baseUrl}/api/Account/login`;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') ?? 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(loginData: LoginDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, loginData, { headers }).pipe(
      tap(res => {
        console.log('Login successful. User:', res);
        this.setCurrentUser(res.user, res.token, res.roles);

        // Store user data in localStorage
        localStorage.setItem('currentUser', JSON.stringify(res.user));
        localStorage.setItem('token', res.token);
        localStorage.setItem('roles', JSON.stringify(res.roles));
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token') ?? null;
  }

  getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }
  hasRole(role: string): boolean {
    const userRoles = this.getRoles();
    return userRoles.includes(role);
  }

  private setCurrentUser(user: any, token: string, roles: string[]): void {
    this.currentUserSubject.next(user);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
