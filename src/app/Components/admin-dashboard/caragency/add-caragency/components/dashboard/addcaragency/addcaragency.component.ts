import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CaragencyService } from '../../../../../../../Services/caragency.service';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../../../../../nav-bar/nav-bar.component';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-addcaragency',
  standalone: true,
  imports:[FormsModule,CommonModule,NavBarComponent],
  templateUrl: './addcaragency.component.html',
  styleUrl: './addcaragency.component.css'
})

export class AddcaragencyComponent {
  carAgency: any = {
    name: '',
    address: '',
    logoURL: '',
    phoneNumber: '',
    websiteURL: '',
    email: '',
    longitude: 0,
    latitude: 0
  };

  constructor(
    private carAgencyService: CaragencyService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.isFormValid()) {
      this.carAgencyService.createCarAgency(this.carAgency).subscribe({
        next: res => {
          this.router.navigate(['/dashboard/caragency']);
        },
        error: error => {
          console.error('Error creating car agency:', error);
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/dashboard/caragency']);
  }

  private isFormValid(): boolean {
    return !!(
      this.carAgency.name &&
      this.carAgency.address &&
      this.carAgency.email 
    );
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const isValid = emailRegex.test(email);
    return isValid;
  }
  
}