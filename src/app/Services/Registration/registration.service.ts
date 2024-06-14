import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private apiUrl =environment.baseUrl +'/api/Account';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/user`, user);
  }
}


