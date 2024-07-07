import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CarAgencyViewDto } from '../models/Car/CarAgencyViewDto';

@Injectable({
  providedIn: 'root'
})
export class CaragencyService {

  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAgencies(): Observable<{ data: CarAgencyViewDto[] }> {
    return this.http.get<{ data: CarAgencyViewDto[] }>(`${this.apiUrl}/api/CarAgency`);
  }

  getCarAgencies(page: number, itemsPerPage: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/CarAgency?page=${page}&itemsPerPage=${itemsPerPage}`);
  }

  getCarAgencyById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/CarAgency/${id}`);
  }

  createCarAgency(carAgency: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/CarAgency`, carAgency);
  }

  updateCarAgency(id: number, carAgency: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/api/CarAgency/${id}`, carAgency); 
  }

  deleteCarAgency(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/CarAgency/${id}`);
  }
}