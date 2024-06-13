import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ihotel } from '../models/Hotel/Ihotel';
import {environment} from '../../environments/environment'
import { IHotelFeature } from '../models/IHotelFeature';
@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private baseUrl: string = environment.baseUrl;

  constructor(private httpclient: HttpClient) { }

  getAllHotels(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.baseUrl}/api/Hotel`);
  }
  getHotelById(id: number): Observable<any> {
    return this.httpclient.get<any[]>(`${this.baseUrl}/api/Hotel/${id}`);
  }
  addHotel(hotel: any): Observable<any> {
    return this.httpclient.post<any>(`${this.baseUrl}/api/Hotel`, hotel);
  }
  deleteHotel(id: number): Observable<any> {
    return this.httpclient.delete<any[]>(`${this.baseUrl}/api/Hotel/${id}`);
  }
  updateHotel(id: number, hotel: Ihotel): Observable<any> {
    return this.httpclient.patch<any[]>(`${this.baseUrl}/api/Hotel/${id}`, hotel);
  }

  getHotelFeatures(hotelId :number): Observable<any>{
    return this.httpclient.get<any>(`${this.baseUrl}/api/GetHotelFeatures/${hotelId}`)
  }
  addHotelFeature(hotelId: number, hotelFeature: IHotelFeature): Observable<any> {
    return this.httpclient.post<any>(`${this.baseUrl}/api/AddFeature/${hotelId}`,hotelFeature);
  }
  deleteHotelFeature(hotelId: number,featureId:number): Observable<any> {
    return this.httpclient.delete<any[]>(`${this.baseUrl}/api/DeleteFeature/${hotelId}/${featureId}`);
  }
  updateHotelFeature(hotelId: number, feature: IHotelFeature): Observable<any> {
    return this.httpclient.patch<any[]>(`${this.baseUrl}/api/UpdateFeature/${hotelId}`, feature);
  }
}
