import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl; // Use the baseUrl from environment configuration

  constructor(private http: HttpClient) { }

  confirmEmail(userId: string, token: string): Observable<any> {
    const url = `${this.baseUrl}/api/account/confirm-email?UserId=${userId}&Token=${token}`;
    return this.http.get(url);
  }
}
