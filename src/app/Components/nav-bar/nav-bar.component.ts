import { Component,OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../Services/Authentication/authentication.service';

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
  constructor(private router: Router, private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.getRole()
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
}
