import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getCars(page: number, itemsPerPage: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/Car?page=${page}&itemsPerPage=${itemsPerPage}`);
  }

  getCaryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/Car/${id}`);
  }

  createCar(car: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/Car`, car);
  }

  updateCar(id: number, car: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/api/Car/${id}`, car); 
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/Car/${id}`);
  }
}