import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
interface LoginDTO {
  userName: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string = environment.baseUrl;

  private apiUrl = `${this.baseUrl}/api/Account/login`; 

  constructor(private http: HttpClient) {}

  login(loginData: LoginDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, loginData, { headers });
  }
}
