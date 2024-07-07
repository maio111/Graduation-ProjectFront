import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarInvoicesService {

  // private baseUrl: string = environment.baseUrl;

  // constructor(private httpclient: HttpClient) { }

  // getInvoiceByRentalId(id: number): Observable<{ data: ViewInvoiceDTO }> {
  //   return this.httpclient.get<{ data: ViewInvoiceDTO }>(`${this.baseUrl}/api/CarInvoices/${id}`);
  // }
}
