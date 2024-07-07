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
    id: '',
    name: '',
    address: '',
    cityId: '',
    phoneNumber: '',
    websiteURL: '',
    email: '',
    longitude: '',
    latitude: '',
    agencyPhoto: null // Property to hold the selected agency photo
  };

  cities: ICity[] = []; // Assuming ICity interface represents city data structure

  constructor(
    private route: ActivatedRoute,
    private carAgencyService: CaragencyService,
    private router: Router,
    private cityService: CityService
  ) {}

  ngOnInit() {
    // Fetch car agency details based on route parameter
    const id = this.route.snapshot.params['id']; // Assuming id is passed in the route
    this.getCarAgency(id);
    this.getCities(); // Fetch cities when component initializes
  }

  getCarAgency(id: number) {
    this.carAgencyService.getCarAgencyById(id).subscribe({
      next: (res) => {
        this.carAgency = res.data; // Assuming response contains agency details
      },
      error: error => {
        console.error('Error fetching car agency:', error);
        // Handle error and display to user
      }
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('id', this.carAgency.id);
    formData.append('name', this.carAgency.name);
    formData.append('address', this.carAgency.address);
    formData.append('cityId', this.carAgency.cityId);
    formData.append('phoneNumber', this.carAgency.phoneNumber);
    formData.append('websiteURL', this.carAgency.websiteURL);
    formData.append('email', this.carAgency.email);
    formData.append('longitude', this.carAgency.longitude);
    formData.append('latitude', this.carAgency.latitude);
    formData.append('agencyPhoto', this.carAgency.agencyPhoto); 

    this.carAgencyService.updateCarAgency(this.carAgency.id, formData).subscribe({
      next: res => {
        this.router.navigate(['/dashboard/caragency']);
      },
      error: error => {
        console.error('Error updating car agency:', error);
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