import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginDTO } from '../../models/Authentication/LoginDTO';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl: string = environment.baseUrl;
  private apiUrl = `${this.baseUrl}/api/Account/login`;
  private jwtHelper: JwtHelperService

  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  getUserById(id: number) : any{
    return this.http.get<any>(`${this.baseUrl}/api/Account/GetUserById/${id}`);
  }

  login(loginData: LoginDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, loginData, { headers }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string {
    return localStorage.getItem('token') ?? '';
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return this.getRolesFromDecodedToken(decodedToken);
    }
    return [];
  }

  hasRole(role: string): boolean {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      const userRoles = this.getRolesFromDecodedToken(decoded);
      return userRoles.includes(role);
    }
    return false;
  }

  decodeToken(token: string): any {
    try {
      const decoded = this.jwtHelper.decodeToken(token);
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getUserIdFromToken(decodedToken: any): number {
    const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    return Number(userId);
  }
  getRolesFromDecodedToken(decodedToken: any): string[] {
    const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return Array.isArray(roles) ? roles : [roles];
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
