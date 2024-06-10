import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/Login/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
    userName: string = '';
    password: string = '';
    errorMessage: string = '';
  
    constructor(private loginService: LoginService, private router: Router) {}
  
    onLogin() {
      const loginData = {
        userName: this.userName,
        password: this.password
      };
  
      this.loginService.login(loginData).subscribe(
        response => {
          if (response.ispass) {
            localStorage.setItem('token', response.token);
            this.router.navigate(['/home']); 
          } else {
            this.errorMessage = response.message;
          }
        },
        error => {
          this.errorMessage = 'Invalid username or password';
        }
      );
    }
}
