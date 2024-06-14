import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/iuser';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.baseUrl;
  constructor(private httpclient: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.baseUrl}/api/Admin/GetAllAdmins`);
  }
  getUserById(id: string): Observable<any> {
    return this.httpclient.get<any[]>(`${this.baseUrl}/api/Admin/GetAdminBYID/${id}`);
  }
  addUser(user: any): Observable<any> {
    return this.httpclient.post<any>(`${this.baseUrl}/api/Account/register/admin`, user);
  }
  deleteUser(id: string): Observable<any> {
    return this.httpclient.delete<any[]>(`${this.baseUrl}/api/Admin/DeleteAdmin/${id}`);
  }
  updateUser(id: string, user: IUser): Observable<any> {
    return this.httpclient.patch<any[]>(`${this.baseUrl}/api/Admin/UpdateAdmin/${id}`, user);
  }

}
