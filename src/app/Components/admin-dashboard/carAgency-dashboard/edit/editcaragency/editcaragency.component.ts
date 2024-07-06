 import { Component, NgModule } from '@angular/core';
  import {FormsModule, Validators } from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { CaragencyService } from '../../../../../Services/caragency.service';
  import { CommonModule } from '@angular/common';
  import { NavBarComponent } from '../../../../nav-bar/nav-bar.component';
  
  @Component({
    selector: 'app-editcaragency',
    standalone: true,
    imports:[FormsModule,CommonModule,NavBarComponent],
  templateUrl: './editcaragency.component.html',
  styleUrl: './editcaragency.component.css'
})
export class EditcaragencyComponent {
 
    carAgency: any = {
      id: 0,
      name: '',
      address: '',
      logoURL: '',
      phoneNumber: '',
      websiteURL: '',
      email: '',
      longitude: 0,
      latitude: 0
    };
    carAgencyId!: number;
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private carAgencyService: CaragencyService
    ) {}
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.carAgencyId = +params['id']; 
        this.loadCarAgency();
      });
    }
  
    loadCarAgency() {
      this.carAgencyService.getCarAgencyById(this.carAgencyId).subscribe({
        next: (res: any) => {
          this.carAgency = res.data; 
        },
        error: (error) => {
          console.error('Error fetching car agency:', error);
        }
      });
    }
  
    onSubmit() {
      this.carAgencyService.updateCarAgency(this.carAgencyId, this.carAgency).subscribe({
        next: (res: any) => {
          console.log('Car agency updated successfully:', res);
          this.router.navigate(['/dashboard/caragency']);
        },
        error: (error) => {
          console.error('Error updating car agency:', error);
        }
      });
    }
    
    onCancel() {
      this.router.navigate(['/dashboard/caragency']); 
    }
  }
  
