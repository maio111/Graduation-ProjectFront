import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [SideBarComponent,CommonModule],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent {
  details = [
    { icon: 'fas fa-user', label: 'Name', value: 'Enter Your Name' },
    { icon: 'fas fa-user-tag', label: 'Display name', value: 'Choose a display name' },
    { icon: 'fas fa-envelope', label: 'Email address', value: 'Verified',isVerified: true },
    { icon: 'fas fa-phone', label: 'Phone number', value: 'Add your phone number' },
    { icon: 'fas fa-calendar-alt', label: 'Date of birth', value: 'Enter your date of birth' },
    { icon: 'fas fa-flag', label: 'Nationality', value: 'Select the country/region you\'re from' },
    { icon: 'fas fa-venus-mars', label: 'Gender', value: 'Select your gender' },
    { icon: 'fas fa-map-marker-alt', label: 'Address', value: 'Add your address' }
  ];
  constructor() {}

  editDetail(detail: string) {
    console.log(`Editing ${detail}`);
    // Implement the logic to edit the detail
  }
}
