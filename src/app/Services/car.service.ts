import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ICarFilteredParams } from '../models/Car/ICarFilteredParams';
import { IFilteredCar } from '../models/Car/IFilteredCar';

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

  getFilteredCars(filterParams: ICarFilteredParams): Observable<any> {
    let params = this.buildFilterParams(filterParams);
    return this.http.get<any>(`${this.apiUrl}/api/Car/GetFilteredCars`, { params });
  }

  private buildFilterParams(filterParams: ICarFilteredParams): HttpParams {
    let params = new HttpParams();
    if (filterParams.cityId) {
      params = params.append('CityId', filterParams.cityId.toString());
    }
    if (filterParams.pickUpDate) {
      params = params.append('PickUpDate', filterParams.pickUpDate.toString());
    }
    if (filterParams.dropOffDate) {
      params = params.append('DropOffDate', filterParams.dropOffDate.toString());
    }
    if (filterParams.description) {
      params = params.append('Description', filterParams.description);
    }
    if (filterParams.minPrice) {
      params = params.append('MinPrice', filterParams.minPrice.toString());
    }
    if (filterParams.maxPrice) {
      params = params.append('MaxPrice', filterParams.maxPrice.toString());
    }
    if (filterParams.gearType) {
      params = params.append('GearType', filterParams.gearType.toString());
    }
    if (filterParams.modelOfYear) {
      params = params.append('ModelOfYear', filterParams.modelOfYear.toString());
    }
    if (filterParams.brand) {
      params = params.append('Brand', filterParams.brand);
    }
    if (filterParams.insuranceIncluded) {
      params = params.append('InsuranceIncluded', filterParams.insuranceIncluded.toString());
    }
    if (filterParams.numberOfSeats) {
      params = params.append('NumberOfSeats', filterParams.numberOfSeats.toString());
    }
    if (filterParams.agencyId) {
      params = params.append('AgencyId', filterParams.agencyId.toString());
    }

    return params;
  }
}