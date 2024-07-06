import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CaragencyService } from '../../../../../Services/caragency.service';
import { ICity } from '../../../../../models/City/ICity';
import { CityService } from '../../../../../Services/city.service';
import { NavBarComponent } from '../../../../nav-bar/nav-bar.component';
import { HotelMapComponent } from '../../../hotels-dashboard/hotel-map/hotel-map.component';


@Component({
  selector: 'app-addcaragency',
  standalone: true,
  imports:[FormsModule, CommonModule, HotelMapComponent, NavBarComponent],
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
  cities: ICity[] = [] as ICity[]

  constructor(
    private carAgencyService: CaragencyService,
    private router: Router,
    private cityService:CityService
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
