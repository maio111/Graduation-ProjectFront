import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CaragencyService } from '../../../../../Services/caragency.service';
@Component({
  selector: 'app-addcaragency',
  standalone: true,
  imports:[FormsModule,CommonModule],
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
      this.carAgencyService.createCarAgency(this.carAgency).subscribe({
        next: res => {
          this.router.navigate(['/dashboard/caragency']);
        },
        error: error => {
          console.error('Error creating car agency:', error);
        }
      });
    
  }

  onCancel() {
    this.router.navigate(['/dashboard/caragency']);
  }


 
  
}