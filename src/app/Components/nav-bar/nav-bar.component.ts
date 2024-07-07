import { Component,OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../Services/Authentication/authentication.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  showDropdown: boolean = false; // Track dropdown visibility
  isAdmin: boolean = false;
  user:any;
  baseUrl = environment.baseUrl;
  constructor(private router: Router, private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.getRole()
    this.getUserData()
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
  logout(): void {
    localStorage.removeItem('token');
  }
  getRole() {
    this.isAdmin = this.auth.hasRole("ADMIN");
  }
  getUserData() {
    const token = this.auth.getToken();
    const decoded = this.auth.decodeToken(token);
    const userId = this.auth.getUserIdFromToken(decoded);

    this.auth.getUserById(userId).subscribe({
      next: (res: any) => {
        this.user = res.data;
      },
      error: (err: any) => console.error(err)
    });
  }
}
