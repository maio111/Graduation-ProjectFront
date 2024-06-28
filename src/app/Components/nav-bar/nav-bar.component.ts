import { Component,OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  showDropdown: boolean = false; // Track dropdown visibility

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    // Implement your actual authentication check here
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
    // Implement logout functionality here (clear token, redirect, etc.)
    localStorage.removeItem('token');
    // Additional logic for logout like clearing other data or navigating to a specific page
  }
}
