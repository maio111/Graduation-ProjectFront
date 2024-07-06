 import { Component, NgModule } from '@angular/core';
  import {FormsModule, Validators } from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { CaragencyService } from '../../../../../Services/caragency.service';
  import { CommonModule } from '@angular/common';
  import { NavBarComponent } from '../../../../nav-bar/nav-bar.component';
import { CityService } from '../../../../../Services/city.service';
import { ICity } from '../../../../../models/City/ICity';
import { HotelMapComponent } from '../../../hotels-dashboard/hotel-map/hotel-map.component';
  
  @Component({
    selector: 'app-editcaragency',
    standalone: true,
    imports:[FormsModule,CommonModule,NavBarComponent,HotelMapComponent],
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
    cities: ICity[] = [] as ICity[]

  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private carAgencyService: CaragencyService,
      private cityService:CityService

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
    onCoordinatesChange(newCoordinates: { latitude: number; longitude: number }) {
      this.carAgency.latitude = newCoordinates.latitude;
      this.carAgency.longitude = newCoordinates.longitude;
    }
    getCities() {
      this.cityService.getAllCities().subscribe({
        next: (res) => {
          this.cities = res.data;
          console.log(res)
        },
        error: error => {
          console.error('Error', error);
        }
  
      })
    }
  }
  