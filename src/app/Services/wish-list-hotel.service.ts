import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWishlistHotelDTO } from '../models/Hotel/IWishlistHotelDTO';

@Injectable({
  providedIn: 'root'
})
export class WishListHotelService {
  private baseUrl: string = environment.baseUrl;

  constructor(private httpclient: HttpClient) { }

  getWishListHotels(userId: number): Observable<{ data: IWishlistHotelDTO[] }> {
    return this.httpclient.get<{ data: IWishlistHotelDTO[] }>(`${this.baseUrl}/api/WishList/user/${userId}`);
  }

  addHotelToWishList(userId: number, hotelId: number): Observable<any> {
    return this.httpclient.post<any>(`${this.baseUrl}/api/WishList/user/${userId}/${hotelId}`, {});
  }

  removeHotelFromWishList(userId: number, hotelId: number): Observable<any> {
    return this.httpclient.delete<any>(`${this.baseUrl}/api/WishList/user/${userId}/${hotelId}`);
  }

  checkHotelsInUserWishList(userId: number, hotelIds: number[]): Observable<{ data: boolean[] }> {
    const url = `${this.baseUrl}/api/WishList/user/${userId}`;
    return this.httpclient.post<{ data: boolean[] }>(url, hotelIds);
  }
}
