import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CarRentalFilterationDTO } from '../models/CarRents/CarRentalFilterationDTO';
import { CarRentalViewDTO } from '../models/CarRents/CarRentalViewDTO';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../models/GeneralResponse';

@Injectable({
  providedIn: 'root'
})
export class CarRentalService {
  private apiUrl = `${environment.baseUrl}/api/CarRental`;

  constructor(private http: HttpClient) { }

  getFilteredCarRentals(filter: CarRentalFilterationDTO): Observable<GeneralResponse<CarRentalViewDTO[]>> {
    let params = new HttpParams();
    if (filter.pickUpCity) params = params.set('pickUpCity', filter.pickUpCity);
    if (filter.pickUpDate) params = params.set('pickUpDate', filter.pickUpDate.toISOString());
    if (filter.dropOffDate) params = params.set('dropOffDate', filter.dropOffDate.toISOString());
    if (filter.minPrice !== undefined) params = params.set('minPrice', filter.minPrice.toString());
    if (filter.maxPrice !== undefined) params = params.set('maxPrice', filter.maxPrice.toString());
    if (filter.gearType !== undefined) params = params.set('gearType', filter.gearType.toString());
    if (filter.modelOfYear !== undefined) params = params.set('modelOfYear', filter.modelOfYear.toString());
    if (filter.brand) params = params.set('brand', filter.brand);
    if (filter.numberOfSeats !== undefined) params = params.set('numberOfSeats', filter.numberOfSeats.toString());
    if (filter.agencyId !== undefined) params = params.set('agencyId', filter.agencyId.toString());

    return this.http.post<GeneralResponse<CarRentalViewDTO[]>>(`${this.apiUrl}/GetFilteredCarRentals`, { params });
  }

  getFilteredUserCarRentals(filter: CarRentalFilterationDTO): Observable<any> {
    let params = new HttpParams();
    if (filter.pickUpCity) params = params.set('pickUpCity', filter.pickUpCity);
    if (filter.pickUpDate) params = params.set('pickUpDate', filter.pickUpDate.toISOString());
    if (filter.dropOffDate) params = params.set('dropOffDate', filter.dropOffDate.toISOString());
    if (filter.minPrice !== undefined) params = params.set('minPrice', filter.minPrice.toString());
    if (filter.maxPrice !== undefined) params = params.set('maxPrice', filter.maxPrice.toString());
    if (filter.gearType !== undefined) params = params.set('gearType', filter.gearType.toString());
    if (filter.modelOfYear !== undefined) params = params.set('modelOfYear', filter.modelOfYear.toString());
    if (filter.brand) params = params.set('brand', filter.brand);
    if (filter.numberOfSeats !== undefined) params = params.set('numberOfSeats', filter.numberOfSeats.toString());
    if (filter.agencyId !== undefined) params = params.set('agencyId', filter.agencyId.toString());

    return this.http.post<any>(`${this.apiUrl}/GetFilteredUserCarRentals`, null, { params });
  }
}
