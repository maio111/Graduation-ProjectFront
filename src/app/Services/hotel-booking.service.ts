import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HotelBookingViewDTO } from '../models/HotelBooking/HotelBookingViewDTO ';
import { Observable } from 'rxjs';
import { HotelBookingFilterDTO } from '../models/HotelBooking/HotelBookingFilterDTO ';
import { GeneralResponse } from '../models/GeneralResponse';
import { CreateBookingDTO } from '../models/HotelBooking/CreateBookingDTO';

@Injectable({
  providedIn: 'root'
})
export class HotelBookingService {
  apiUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  // getBookings(): Observable<HotelBookingViewDTO[]> {
  //   return this.http.get<HotelBookingViewDTO[]>(this.apiUrl);
  // }

  // getBooking(id: number): Observable<HotelBookingViewDTO> {
  //   return this.http.get<HotelBookingViewDTO>(`${this.apiUrl}/${id}`);
  // }

  createBooking(booking: CreateBookingDTO): Observable<CreateBookingDTO> {
    return this.http.post<CreateBookingDTO>(`${this.apiUrl}/api/HotelBooking`, booking);
  }

  // updateBooking(id: number, booking: HotelBookingViewDTO): Observable<HotelBookingViewDTO> {
  //   return this.http.put<HotelBookingViewDTO>(`${this.apiUrl}/${id}`, booking);
  // }

  // deleteBooking(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }

  getFilteredBookings(filter: HotelBookingFilterDTO): Observable<GeneralResponse<HotelBookingViewDTO[]>> {
    let params = new HttpParams();
    if (filter.checkIn) params = params.set('checkIn', filter.checkIn.toISOString());
    if (filter.checkOut) params = params.set('checkOut', filter.checkOut.toISOString());
    if (filter.roomNumber !== undefined) params = params.set('roomNumber', filter.roomNumber.toString());
    if (filter.userName !== undefined) params = params.set('userName', filter.userName.toString());
    if (filter.hotelName !== undefined) params = params.set('hotelName', filter.hotelName.toString());
    if (filter.status !== undefined) params = params.set('status', filter.status.toString());
    if (filter.price !== undefined) params = params.set('price', filter.price.toString());

    return this.http.get<GeneralResponse<HotelBookingViewDTO[]>>(`${this.apiUrl}/api/HotelBooking/filtered`, { params });
  }
}
