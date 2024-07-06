import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../models/GeneralResponse';
import { Passport } from '../models/passport';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassportService {
  private baseUrl = environment.baseUrl;
  private apiUrl = `${this.baseUrl}/api/passport`;

  constructor(private http: HttpClient) { }

  getAllPassports(includeProperties: string[] = []): Observable<GeneralResponse<Passport[]>> {
    let params = new HttpParams();
    includeProperties.forEach(prop => {
      params = params.append('includeProperties', prop);
    });

    return this.http.get<GeneralResponse<Passport[]>>(this.apiUrl, { params });
  }

  getPassportById(id: number, includeProperties: string[] = []): Observable<GeneralResponse<Passport>> {
    let params = new HttpParams();
    includeProperties.forEach(prop => {
      params = params.append('includeProperties', prop);
    });

    return this.http.get<GeneralResponse<Passport>>(`${this.apiUrl}/${id}`, { params });
  }

  getPassportByUserId(userId: number): Observable<GeneralResponse<Passport>> {
    return this.http.get<GeneralResponse<Passport>>(`${this.apiUrl}/ByUserId/${userId}`);
  }

  addPassport(passport: Passport): Observable<GeneralResponse<string>> {
    return this.http.post<GeneralResponse<string>>(this.apiUrl, passport);
  }

  updatePassport(id: number, passport: Passport): Observable<GeneralResponse<Passport>> {
    return this.http.put<GeneralResponse<Passport>>(`${this.apiUrl}/${id}`, passport);
  }

  deletePassport(id: number): Observable<GeneralResponse<Passport>> {
    return this.http.delete<GeneralResponse<Passport>>(`${this.apiUrl}/${id}`);
  }
}
