
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CarRentalInvoiceDTO } from '../models/Car/CarRentalInvoiceDTO';

@Injectable({
  providedIn: 'root'
})
export class CarRentalInvoicesService {
  private baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getCarRentalInvoices(): Observable<{ data: CarRentalInvoiceDTO[], totalItems: number }> {
    return this.httpClient.get<{ data: CarRentalInvoiceDTO[], totalItems: number }>(`${this.baseUrl}/api/CarRentalInvoice`);
  }
  getCarRentalInvoice(id:number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/api/CarRentalInvoice/${id}`);
  }
  getUserCarRentalInvoice(userId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/GetCarUserRentalInvoiceById/${userId}`);
  }

}
