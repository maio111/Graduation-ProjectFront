import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRoom } from '../models/IRoom';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl: string = environment.baseUrl;

  constructor(private httpclient: HttpClient) { }

  getHotelRooms(id:number, includeProperties: string[]): Observable<any[]> {
    let params = new HttpParams();
    includeProperties.forEach(prop => {
      params = params.append('includeProperties', prop);
    });
    return this.httpclient.get<any[]>(`${this.baseUrl}/api/Room/${id}`, { params });
  }

  getRoomById(id: number): Observable<any> {
    return this.httpclient.get<any[]>(`${this.baseUrl}/api/Room/${id}`);
  }
  addRoom(hotel: any): Observable<any> {
    return this.httpclient.post<any>(`${this.baseUrl}/api/Room`, hotel);
  }
  deleteRoom(id: number): Observable<any> {
    return this.httpclient.delete<any[]>(`${this.baseUrl}/api/Room/${id}`);
  }
  updateRoom(id: number, Room: IRoom): Observable<any> {
    return this.httpclient.patch<any[]>(`${this.baseUrl}/api/Room/${id}`, Room);
  }
}
