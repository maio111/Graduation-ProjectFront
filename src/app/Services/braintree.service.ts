import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BraintreeService {
  private apiUrl = `${environment.baseUrl}/api/payment`;

  constructor(private http: HttpClient) { }

  getClientToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/client_token`);
  }

  checkout(nonce: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, { nonce, amount });
  }
}
