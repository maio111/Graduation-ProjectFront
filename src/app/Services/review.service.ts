import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDisplayHotelReviewDTO } from '../models/Review/IDisplayHotelReviewDTO';
import { IAddHotelReviewDTO } from '../models/Review/IAddHotelReviewDTO';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl: string = environment.baseUrl;

  constructor(private httpclient: HttpClient) { }

  getAllReviewsByHotelId(hotelId: number): Observable<{ data: IDisplayHotelReviewDTO[] }> {
    return this.httpclient.get<{ data: IDisplayHotelReviewDTO[] }>(`${this.baseUrl}/api/review/reviews/${hotelId}`);
  }

  addReview(createReviewDto: IAddHotelReviewDTO): Observable<any> {
    return this.httpclient.post<any>(`${this.baseUrl}/api/review/AddReview`, createReviewDto);
  }
}

