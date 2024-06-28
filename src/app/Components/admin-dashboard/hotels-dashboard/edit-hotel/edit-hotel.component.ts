import { Component, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ihotel } from '../../../../models/Hotel/Ihotel';
import { HotelService } from '../../../../Services/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HotelMapComponent } from "../hotel-map/hotel-map.component";
<<<<<<< HEAD
import { ICity } from '../../../../models/City/ICity';
import { CityService } from '../../../../Services/city.service';
@Component({
  selector: 'app-edit-hotel',
  standalone: true,
  templateUrl: './edit-hotel.component.html',
  styleUrl: './edit-hotel.component.css',
  imports: [FormsModule, CommonModule, HotelMapComponent]
=======
import { NavBarComponent } from "../../../nav-bar/nav-bar.component";
@Component({
    selector: 'app-edit-hotel',
    standalone: true,
    templateUrl: './edit-hotel.component.html',
    styleUrl: './edit-hotel.component.css',
    imports: [FormsModule, CommonModule, HotelMapComponent, NavBarComponent]
>>>>>>> df1f1e146533ad8e6673fb4bcd52077828a9126c
})
export class EditHotelComponent {
  hotel: Ihotel = {
    id: 0,
    name: '',
    description: '',
    phoneNumber: '',
    cityId: 0,
    email: '',
    webSiteURL: '',
    latitude: 0,
    longitude: 0
  };
  hotelId!: number;
  cities: ICity[] = [] as ICity[]
  currentCity!: string;
  constructor(private router: Router, private hotelService: HotelService, private route: ActivatedRoute, private cityService: CityService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.hotelId = params['Id'];
      this.route.queryParams.subscribe(params => {
        this.hotel = JSON.parse(params['hotel']);
      });
    });
    this.getCities()
  }

  onSubmit(hotelForm: NgForm) {
    if (hotelForm.valid) {
      this.hotelService.updateHotel(this.hotelId, this.hotel).subscribe({
        next: (res) => {
          console.log(this.hotel);
          console.log(res);
          this.router.navigate(['dashboard/hotelsDashboard']);
        },
        error: (error) => {
          console.log(this.hotel);
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