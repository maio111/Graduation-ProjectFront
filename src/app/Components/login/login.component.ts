import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/Login/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [FormsModule, CommonModule, NavBarComponent]
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
            this.router.navigate(['/hotelBooking']); 
          } else {
            this.errorMessage = response.message;
          }
        },
        error => {
          this.errorMessage = 'Invalid username or password';
        }
      );
    }
    navigateToRegister() {
      this.router.navigate(['/register']) ;debugger 
    }
}
