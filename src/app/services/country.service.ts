import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { ICountry } from '../models/ICountry';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private baseUrl: string = environment.baseUrl;
  constructor(private httpclient: HttpClient) { }
  getAllCountries(): Observable<ICountry[]> {
    return this.httpclient.get<ICountry[]>(`${this.baseUrl}/api/Country`);
  }

  getCountryById(id: number): Observable<ICountry> {
    return this.httpclient.get<ICountry>(`${this.baseUrl}/api/Country/${id}`);
  }

  addCountry(country: ICountry): Observable<ICountry> {
    return this.httpclient.post<ICountry>(`${this.baseUrl}/api/Country`, country);
  }

  deleteCountry(id: number): Observable<any> {
    return this.httpclient.delete<any>(`${this.baseUrl}/api/Country/${id}`);
  }

  updateCountry(id: number, country: ICountry): Observable<ICountry> {
    return this.httpclient.patch<ICountry>(`${this.baseUrl}/api/Country/${id}`, country);
  }
}
