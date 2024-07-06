import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  menuItems = [
    { icon: 'fa-user', label: ' Personal details', route: '/personal-details' },
    { icon: 'fa-lock', label: ' Security', route: '/security' },
    { icon: 'fas fa-user-secret', label: ' Passport', route: '/privacy' }
  ];

  activeItem: any = null; // Initially no item is active

  constructor() {}

  setActive(item: any) {
    this.activeItem = item;
  }

  // Method to determine if a menu item is active
  isActive(item: any): boolean {
    return this.activeItem === item;
    
  }
}
