import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarRentalDTO } from '../models/CarRents/CarRentalDTO';

@Injectable({
  providedIn: 'root'
})
export class CarPaymentService {
  private apiUrl = `${environment.baseUrl}/api/CarRental`; // Adjust API URL for Car Rentals

  constructor(private http: HttpClient) { }

  getClientToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/client_token`);
  }

  checkout(nonce: string, amount: number, RentalData: CarRentalDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, { nonce, amount, RentalData });
  }

  checkoutCash(amount: number, carRentalData: CarRentalDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout/cash`, { amount, carRentalData });
  }
}
