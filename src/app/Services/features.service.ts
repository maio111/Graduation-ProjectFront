import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFeature } from '../models/IFeature';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {
  private baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  getFeatures(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/api/GetFeatures`);
  }

  getFeatureById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/api/Feature/${id}`);
  }

  addFeature(feature: IFeature): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/api/Feature`, feature);
  }

  updateFeature(id: number, feature: IFeature): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/api/Feature/${id}`, feature);
  }

  deleteFeature(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/api/Feature/${id}`);
  }
}
