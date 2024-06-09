import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../models/Hotel';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private baseUrl: string = environment.baseUrl;

  constructor(private httpclient: HttpClient) { }

  getAllHotels(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.baseUrl}/api/Hotel`);
  }
  getHotelById(id:number): Observable<any>{
    return this.httpclient.get<any[]>(`${this.baseUrl}/api/Hotel/${id}`);
  }
  addHotel(hotel: any): Observable<any> {
    return this.httpclient.post<any>(`${this.baseUrl}/api/Hotel`, hotel);
  }
  deleteHotel(id: number): Observable<any> {
    return this.httpclient.delete<any[]>(`${this.baseUrl}/api/Hotel/${id}`);
  }
  updateHotel(id: number, hotel: Hotel): Observable<any> {
    return this.httpclient.patch<any[]>(`${this.baseUrl}/api/Hotel/${id}`, hotel);
  }
}
