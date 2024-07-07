import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarRentalFiltered } from '../models/Car/CarRentalFiltered';
import { CarRentalViewDto } from '../models/Car/CarRentalViewDto';
import { UserBookingsFilter } from '../models/HotelBooking/UserBookingsFilter';
@Injectable({
  providedIn: 'root'
})
export class CarRentalService {
  private baseUrl: string = environment.baseUrl;
  private apiUrl = environment.baseUrl;

  constructor(private httpclient: HttpClient) { }

  getFilteredCarRentals(filter: CarRentalFiltered): Observable<any> {
    let params = new HttpParams();
    if (filter.UserId) params = params.set('UserId', filter.UserId.toString());
    if (filter.CarAgencyName) params = params.set('CarAgencyName', filter.CarAgencyName);
    if (filter.PickUpDate) params = params.set('PickUpDate', filter.PickUpDate.toISOString());
    if (filter.DropOffDate) params = params.set('DropOffDate', filter.DropOffDate.toISOString());
    if (filter.Status !== undefined) params = params.set('Status', filter.Status.toString());

    return this.httpclient.get<CarRentalViewDto[]>(`${this.apiUrl}/api/CarRental/GetFilteredCarRentals`, { params });
  }

getFilteredUserCarRentals(filter: CarRentalFiltered,id :number): Observable<any> {
    let params = new HttpParams();
    if (filter.UserId) params = params.set('UserId', filter.UserId.toString());
    if (filter.CarAgencyName) params = params.set('CarAgencyName', filter.CarAgencyName);
    if (filter.PickUpDate) params = params.set('PickUpDate', filter.PickUpDate.toISOString());
    if (filter.DropOffDate) params = params.set('DropOffDate', filter.DropOffDate.toISOString());
    if (filter.Status !== undefined) params = params.set('Status', filter.Status.toString());

    return this.httpclient.get<CarRentalViewDto[]>(`${this.apiUrl}/api/CarRental/GetFilteredUserCarRents${id}`, { params });
  }
}
