import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateBookingDTO } from '../models/HotelBooking/CreateBookingDTO';

@Injectable({
  providedIn: 'root'
})
export class BraintreeService {
  private apiUrl = `${environment.baseUrl}/api/HotelBooking`;

  constructor(private http: HttpClient) { }

  getClientToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/client_token`);
  }

  checkout(nonce: string, amount: number, bookingData :CreateBookingDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, { nonce, amount, bookingData });
  }

  checkoutCash(amount: number, bookingData: CreateBookingDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout/cash`, { amount, bookingData });
  }
}
