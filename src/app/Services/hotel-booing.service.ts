import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelBookingService {
  private baseUrl = 'http://localhost:5285/api/HotelBooking';

  constructor(private http: HttpClient) { }

  getAllBookings(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getBookingById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }


  updateBooking(id: number, booking: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, booking);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
