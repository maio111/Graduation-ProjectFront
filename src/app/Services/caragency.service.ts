import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaragencyService {

  private apiUrl = `${environment.baseUrl}/api/CarAgency`;

  constructor(private http: HttpClient) {}

  getCarAgencies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getFilteredCarAgencies(filter: any): Observable<any> {
    let params = new HttpParams();
    for (const key in filter) {
      if (filter.hasOwnProperty(key) && filter[key]) {
        params = params.append(key, filter[key]);
      }
    }
    return this.http.get<any>(`${this.apiUrl}/GetFilteredCarAgencies`, { params });
  }

  getCarAgencyById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCarAgency(carAgency: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, carAgency);
  }


  updateCarAgency(id: number, carAgency: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, carAgency);
  }

  deleteCarAgency(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}