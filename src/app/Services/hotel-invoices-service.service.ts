import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelInvoicesServiceService {
  private apiUrl = `${environment.baseUrl}/api/HotelBookingInvoice` ;

  constructor(private http: HttpClient) { }

  getHotelBookingInvoices(includeProperties: string[] = []): Observable<any> {
    let params = new HttpParams();
    includeProperties.forEach(property => {
      params = params.append('includeProperties', property);
    });
    return this.http.get<any>(`${this.apiUrl}`, { params });
  }

  getUserHotelBookingInvoices(userId: number, includeProperties: string[] = []): Observable<any> {
    let params = new HttpParams();
    includeProperties.forEach(property => {
      params = params.append('includeProperties', property);
    });

    return this.http.get<any>(`${this.apiUrl}/GetUserHotelBookingInvoices/${userId}`, { params });
  }

  getHotelBookingInvoice(id: number, includeProperties: string[] = []): Observable<any> {
    let params = new HttpParams();
    includeProperties.forEach(property => {
      params = params.append('includeProperties', property);
    });

    return this.http.get<any>(`${this.apiUrl}/${id}`, { params });
  }

  postHotelBookingInvoice(invoice: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, invoice);
  }

  putHotelBookingInvoice(id: number, invoice: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, invoice);
  }

  deleteHotelBookingInvoice(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
