import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/Login/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../home/home.component';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { AuthenticationService } from '../../Services/Authentication/authentication.service';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [FormsModule, CommonModule, NavBarComponent,HomeComponent]
})
export class LoginComponent {
  
    userName: string = '';
    password: string = '';
    errorMessage: string = '';
  
  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthenticationService
  ) { }
  
    onLogin() {
      const loginData = {
        userName: this.userName,
        password: this.password
      };
  
      this.authService.login(loginData).subscribe(
        response => {
          if (response.ispass) {
            localStorage.setItem('token', response.token);
          } else {
            this.errorMessage = response.message;
          }
          this.router.navigate(['']); 
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
