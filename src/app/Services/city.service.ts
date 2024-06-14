import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICity } from '../models/City/ICity';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseUrl: string = environment.baseUrl;

  constructor(private httpclient: HttpClient) { }

  getCountryCities(id: number, includeProperties: string[]): Observable<any[]> {
    let params = new HttpParams();
    includeProperties.forEach(prop => {
      params = params.append('includeProperties', prop);
    });
    return this.httpclient.get<any>(`${this.baseUrl}/api/GetCountryCites/${id}`);
  }

  getCityById(id: number): Observable<any> {
    return this.httpclient.get<any>(`${this.baseUrl}/api/City/${id}`);
  }
  addCity(city: any): Observable<any> {
    return this.httpclient.post<any>(`${this.baseUrl}/api/City`, city);
  }
  deleteCity(id: number): Observable<any> {
    return this.httpclient.delete<any>(`${this.baseUrl}/api/City/${id}`);
  }
  updateCity(id: number, city: ICity): Observable<any> {
    return this.httpclient.patch<any>(`${this.baseUrl}/api/City/${id}`, city);
  }
}
