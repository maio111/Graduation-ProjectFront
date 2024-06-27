import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAdminDTO } from '../models/Admins/IAdminDTO';
import { IAdminPatch } from '../models/Admins/IAdminPatch';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  private baseUrl: string = environment.baseUrl;
  constructor(private httpclient: HttpClient) { }

  getAllAdmins(): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.baseUrl}/api/Admin/GetAllAdmins`);
  }

  
  deleteUserByEmail(email: string): Observable<any> {
    return this.httpclient.delete<any>(`${this.baseUrl}/api/Account/remove-user/${email}`);
  }


  updateAdmin(email: string, admin: IAdminPatch): Observable<void> {
    return this.httpclient.patch<void>(`${this.baseUrl}/api/Admin/UpdateAdminByEmail/${email}`, admin);
  }

  addAdmin(admin: IAdminDTO): Observable<any> {
    console.log(admin)
    return this.httpclient.post<any>(`${this.baseUrl}/api/Account/register/admin`, admin);
  }
  
}
