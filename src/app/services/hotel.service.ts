import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ihotel } from '../models/Hotel/Ihotel';
import {environment} from '../../environments/environment'
import { IHotelFeature } from '../models/IHotelFeature';
import { IHotelFilteredParams } from '../models/Hotel/IHotelFilteredParams';
@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private baseUrl: string = environment.baseUrl;

  constructor(private httpclient: HttpClient) { }

  // getAllHotels(filterParams: IHotelFilteredParams | null): Observable<any[]> {
  //   let params = this.buildFilterParams(filterParams!);
  //   return this.httpclient.get<any[]>(`${this.baseUrl}/api/Hotel`,{params});
  // }
  getAllHotels(includeProperties?: string[]): Observable<any> {
    let params = new HttpParams();
    if (includeProperties) {
      includeProperties.forEach(prop => {
        params = params.append('includeProperties', prop);
      });
    }

    return this.httpclient.get<any[]>(`${this.baseUrl}/api/Hotel`, { params });
  }
  getHotelById(id: number): Observable<{ data: Ihotel }> {
    return this.httpclient.get<{ data: Ihotel }>(`${this.baseUrl}/api/Hotel/${id}`);
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
  getFilteredHotels(filterParams: IHotelFilteredParams) {
    let params = this.buildFilterParams(filterParams);
    return this.httpclient.get<any>(`${this.baseUrl}/api/GetFilteredHotels`, { params });
  }

private buildFilterParams(filterParams: IHotelFilteredParams): HttpParams {
  let params = new HttpParams();
  if (filterParams.cityId) {
    params = params.append('CityId', filterParams.cityId.toString());
  }
  if (filterParams.checkInDate) {
    params = params.append('CheckInDate', filterParams.checkInDate.toString());
  }
  if (filterParams.checkOutDate) {
    params = params.append('CheckOutDate', filterParams.checkOutDate.toString());
  }
  if (filterParams.roomTypeId) {
    params = params.append('RoomTypeId', filterParams.roomTypeId.toString());
  }
  if (filterParams.minPrice) {
    params = params.append('MinPrice', filterParams.minPrice.toString());
  }
  if (filterParams.maxPrice) {
    params = params.append('MaxPrice', filterParams.maxPrice.toString());
  }
  if (filterParams.roomView) {
    params = params.append('RoomView', filterParams.roomView);
  }
  if (filterParams.roomCapacity) {
    params = params.append('roomCapacity', filterParams.roomCapacity);
  }
  if (filterParams.featureIds) {
    filterParams.featureIds.forEach((id: number) => {
      params = params.append('FeatureIds', id.toString());
    });
  }

  return params;
}

}
