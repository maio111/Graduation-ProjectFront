import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenValidationService {
  constructor(private jwtHelper: JwtHelperService) { }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isTokenExpired(token: string | null): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  getTokenExpirationDate(token: string): Date | null {
    const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    return expirationDate ? new Date(expirationDate) : null;
  }

  isValidToken(token: string | null): boolean {
    return !this.jwtHelper.isTokenExpired(token);
  }
}
