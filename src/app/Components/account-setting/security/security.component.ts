import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule,SideBarComponent,RouterLink],
  templateUrl: './security.component.html',
  styleUrl: './security.component.css'
})
export class SecurityComponent {
  sections = [
    {
      title: 'Secure Authentication',
      description: 'Set up two-factor authentication.',
      route: 'secure-authentication',
      name:'Set Up',
      icon: 'fa-shield-alt' // Example icon class from Font Awesome
    },
    {
      title: 'Delete Your Account',
      description: 'Permanently delete your account.',
      route: 'delete-account',
      name:'Delete Account',
      icon: 'fa-trash-alt' // Example icon class from Font Awesome
    },
    {
      title: 'Sign Out Active Sessions',
      description: 'Logout from all active sessions.',
      route: 'sign-out-sessions',
      name:'Sign Out',
      icon: 'fa-sign-out-alt' // Example icon class from Font Awesome
    },
    {
      title: 'Reset Password',
      description: 'Reset your account password.',
      route: 'reset-password',
      name:'Reset',
      icon: 'fa-key' // Example icon class from Font Awesome
    }
  ];
}
