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

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient,) {}

  getAllCars(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/Car`);
  }

  GetCarsByAgencyId(id: number): Observable<any[]> {
    
    return this.http.get<any>(`${this.baseUrl}/api/Car/ByAgency/${id}`);
  }

  // getAgencyCars(agencyId: number): Observable<any> {
  //   return this.http.get<any>(`http://localhost:5285/api/GetAgencyAndCars/${agencyId}`);
  // }
  getCarById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/Car/${id}`);
  }

  addCar(car: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/Car`, car);
  }

  updateCar(id: number, car: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/api/Car/${id}`, car);
  }

  deleteCar(id: number): Observable<ICarFilteredParams> {
    return this.http.delete<any>(`${this.baseUrl}/api/Car/${id}`);
  }

  
  getFilteredCars(filterParams: ICarFilteredParams): Observable<{ data: IFilteredCar[] }> {
    let params = this.buildFilterParams(filterParams);
    return this.http.get <{ data: IFilteredCar[] }>(`${this.baseUrl}/GetFilteredCars`, { params });
<<<<<<< HEAD
=======
    // return this.http.get<any>(`${this.baseUrl}/api/Car/GetFilteredCars`, { params });
>>>>>>> ba7809015cea9b72ed9b962af97f25d66521dd59
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