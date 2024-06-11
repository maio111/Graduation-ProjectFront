import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRoomType } from '../models/IRoomType';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {
  private baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getRoomTypes(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/api/RoomType`);
  }

  getRoomTypeById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/api/RoomType/${id}`);
  }

  addRoomType(roomType: IRoomType): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/api/RoomType`, roomType);
  }

  updateRoomType(id: number, roomType: IRoomType): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/api/RoomType/${id}`, roomType);
  }

  deleteRoomType(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/api/RoomType/${id}`);
  }
}
