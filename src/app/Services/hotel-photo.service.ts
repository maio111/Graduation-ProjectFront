import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHotelPhoto } from '../models/IHotelPhoto';
import { GeneralResponse } from '../models/GeneralResponse'; // Ensure correct path
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelPhotoService {
  apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllPhotos(): Observable<GeneralResponse<IHotelPhoto[]>> {
    return this.http.get<GeneralResponse<IHotelPhoto[]>>(`${this.apiUrl}/api/GetAllHotelsPhotos`);
  }

  getHotelPhotos(hotelId: number): Observable<GeneralResponse<IHotelPhoto[]>> {
    return this.http.get<GeneralResponse<IHotelPhoto[]>>(`${this.apiUrl}/api/GetHotelPhotos/${hotelId}`);
  }

  getHotelPhoto(photoId: number): Observable<GeneralResponse<IHotelPhoto>> {
    return this.http.get<GeneralResponse<IHotelPhoto>>(`${this.apiUrl}/api/HotelPhoto/${photoId}`);
  }

  addHotelPhoto(hotelId: number, photo: FormData): Observable<GeneralResponse<any>> {
    return this.http.post<GeneralResponse<any>>(`${this.apiUrl}/api/HotelPhoto/${hotelId}`, photo);
  }

  updateHotelPhoto(photoId: number, photo: FormData): Observable<GeneralResponse<IHotelPhoto>> {
    return this.http.put<GeneralResponse<IHotelPhoto>>(`${this.apiUrl}/api/HotelPhoto/${photoId}`, photo);
  }

  deleteHotelPhoto(photoId: number): Observable<GeneralResponse<IHotelPhoto>> {
    return this.http.delete<GeneralResponse<IHotelPhoto>>(`${this.apiUrl}/api/HotelPhoto/${photoId}`);
  }
}
