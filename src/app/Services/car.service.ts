import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private baseUrl = `${environment.baseUrl}/api/car`; 

  constructor(private http: HttpClient,) {}

  getAllCars(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

 

  getAgencyCars(agencyId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:5285/api/GetAgencyAndCars/${agencyId}`);
  }
  getCarById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addCar(car: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, car);
  }

  updateCar(id: number, car: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/${id}`, car);
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}