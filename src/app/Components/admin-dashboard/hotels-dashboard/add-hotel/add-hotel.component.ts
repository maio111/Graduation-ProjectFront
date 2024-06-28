import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ihotel } from '../../../../models/Hotel/Ihotel';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HotelService } from '../../../../Services/hotel.service';
import { HotelMapComponent } from "../hotel-map/hotel-map.component";
import { NavBarComponent } from "../../../nav-bar/nav-bar.component";

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
    rating: 0,
    phoneNumber: '',
    email: '',
    webSiteURL: '',
    latitude: 0,
    longitude: 0
  };

  constructor(private router: Router, private hotelService: HotelService) { }

  onSubmit(hotelForm: NgForm) {
    if (hotelForm.valid) {
      this.hotelService.addHotel(this.hotel).subscribe({
        next: res => {
          console.log(this.hotel);
          console.log(res);
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
}
