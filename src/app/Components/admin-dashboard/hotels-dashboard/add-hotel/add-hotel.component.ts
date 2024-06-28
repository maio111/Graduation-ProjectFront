import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ihotel } from '../../../../models/Hotel/Ihotel';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HotelService } from '../../../../Services/hotel.service';
import { HotelMapComponent } from "../hotel-map/hotel-map.component";
import { NavBarComponent } from "../../../nav-bar/nav-bar.component";
import { ICity } from '../../../../models/City/ICity';
import { CityService } from '../../../../Services/city.service';

@Component({
    selector: 'app-add-hotel',
    standalone: true,
    templateUrl: './add-hotel.component.html',
    styleUrls: ['./add-hotel.component.css'],
    imports: [FormsModule, CommonModule, HotelMapComponent, NavBarComponent]
})
export class AddHotelComponent {
  hotel: Ihotel = {
    id: 0,
    name: '',
    description: '',
    cityId: 0,
    phoneNumber: '',
    email: '',
    webSiteURL: '',
    latitude: 0,
    longitude: 0
  };
  cities: ICity[] = [] as ICity[]
  constructor(private router: Router, private hotelService: HotelService, private cityService: CityService) { }
  ngOnInit() {
    this.getCities()
  }
  onSubmit(hotelForm: NgForm) {
    if (hotelForm.valid) {
      this.hotelService.addHotel(this.hotel).subscribe({
        next: res => {
          console.log(this.hotel);
          this.router.navigate(['/dashboard/hotelsDashboard']);
        },
        error: error => {
          console.error('Error adding hotel:', error);
        }
      });
    }
  }

  back(): void {
    this.router.navigate(['/dashboard/hotelsDashboard']);
  }

  onCoordinatesChange(newCoordinates: { latitude: number; longitude: number }) {
    this.hotel.latitude = newCoordinates.latitude;
    this.hotel.longitude = newCoordinates.longitude;
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
