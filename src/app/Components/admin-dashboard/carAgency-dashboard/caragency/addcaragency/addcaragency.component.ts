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
    cityId: '', 
    phoneNumber: '',
    websiteURL: '',
    email: '',
    longitude: '',
    latitude: '',
    agencyPhoto: null 
  };

  cities: ICity[] = []; 

  constructor(
    private carAgencyService: CaragencyService,
    private router: Router,
    private cityService: CityService
  ) {}

  ngOnInit() {
    this.getCities(); 
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.carAgency.name);
    formData.append('address', this.carAgency.address);
    formData.append('cityId', this.carAgency.cityId);
    formData.append('phoneNumber', this.carAgency.phoneNumber);
    formData.append('websiteURL', this.carAgency.websiteURL);
    formData.append('email', this.carAgency.email);
    formData.append('longitude', this.carAgency.longitude);
    formData.append('latitude', this.carAgency.latitude);
    formData.append('agencyPhoto', this.carAgency.agencyPhoto); // Append agency photo

    this.carAgencyService.createCarAgency(formData).subscribe({
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
  
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.carAgency.agencyPhoto = file; 
    }
  }

  getCities() {
    this.cityService.getAllCities().subscribe({
      next: (res) => {
        this.cities = res.data; 
      },
      error: error => {
        console.error('Error fetching cities:', error);
      }
    });
  }

  onCoordinatesChange(newCoordinates: { latitude: number; longitude: number }) {
    this.carAgency.latitude = newCoordinates.latitude;
    this.carAgency.longitude = newCoordinates.longitude;
  }
}