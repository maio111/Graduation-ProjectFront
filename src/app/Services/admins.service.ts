import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  private baseUrl: string = environment.baseUrl;
  constructor(private httpclient: HttpClient) { }
  getAllAdmins(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.baseUrl}/api/Admin/GetAllAdmins`);
  }

  getAdminById(id: number): Observable<any> {
    return this.httpclient.get<any>(`${this.baseUrl}/api/admin/GetAdminById/${id}`);
  }

  // addCountry(admin: ICountry): Observable<ICountry> {
  //   return this.httpclient.post<ICountry>(`${this.baseUrl}/api/Country`, country);
  // }

  // deleteCountry(id: number): Observable<any> {
  //   return this.httpclient.delete<any>(`${this.baseUrl}/api/Country/${id}`);
  // }

  // updateCountry(id: number, country: ICountry): Observable<ICountry> {
  //   return this.httpclient.patch<ICountry>(`${this.baseUrl}/api/Country/${id}`, country);
  // }
}
