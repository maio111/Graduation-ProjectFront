import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarPhoto } from '../models/Car/ICarPhoto';
import { GeneralResponse } from '../models/GeneralResponse'; // Ensure correct path
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarPhotoServiceService {

  apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllPhotos(): Observable<GeneralResponse<ICarPhoto[]>> {
    return this.http.get<GeneralResponse<ICarPhoto[]>>(`${this.apiUrl}/api/GetAllCarsPhotos`);
  }

  getCarPhotos(carId: number): Observable<GeneralResponse<ICarPhoto[]>> {
    return this.http.get<GeneralResponse<ICarPhoto[]>>(`${this.apiUrl}/api/GetCarPhotos/${carId}`);
  }

  getCarPhoto(photoId: number): Observable<GeneralResponse<ICarPhoto>> {
    return this.http.get<GeneralResponse<ICarPhoto>>(`${this.apiUrl}/api/CarPhoto/${photoId}`);
  }

  addCarPhoto(carId: number, photo: FormData): Observable<GeneralResponse<any>> {
    return this.http.post<GeneralResponse<any>>(`${this.apiUrl}/api/PostCarPhoto/${carId}`, photo);
  }

  addCarPhotos(carId: number, photos: any): Observable<GeneralResponse<any>> {
    return this.http.post<GeneralResponse<any>>(`${this.apiUrl}/api/PostBulkCarPhotos/${carId}`, photos);
  }

  updateCarPhoto(photoId: number, photo: FormData): Observable<GeneralResponse<ICarPhoto>> {
    return this.http.put<GeneralResponse<ICarPhoto>>(`${this.apiUrl}/api/CarPhoto/${photoId}`, photo);
  }

  deleteCarPhoto(photoId: number): Observable<GeneralResponse<ICarPhoto>> {
    return this.http.delete<GeneralResponse<ICarPhoto>>(`${this.apiUrl}/api/CarPhoto/${photoId}`);
  }
}
