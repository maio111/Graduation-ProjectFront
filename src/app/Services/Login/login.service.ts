import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { deprecate } from 'util';
interface LoginDTO {
  userName: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl: string = environment.baseUrl;
  currentUser: any;
  private apiUrl = `${this.baseUrl}/api/Account/login`;

  constructor(private http: HttpClient) { }

  login(loginData: LoginDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, loginData, { headers }).pipe(
      tap(res => {
        console.log('Login successful. User:', res);
        this.currentUser = res.user;

        // Store user ID in localStorage
        localStorage.setItem('userId', res.user.id); // Adjust according to your API response structure
      }),
      catchError(error => {
        console.error('Login failed', error);
        throw error; // Rethrow the error to propagate it to the subscriber
      })
    );
  }

  // Method to retrieve user ID from localStorage as a number
  getUserIdFromLocalStorage(): number {
    const userIdStr = localStorage.getItem('userId');
    if (userIdStr) {
      return parseInt(userIdStr, 10); // Parse the string to an integer with base 10
    }
    return 0;
  }
}
