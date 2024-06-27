import { CommonModule } from '@angular/common';
import { Component, OnInit, numberAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { HoteldetailsimgComponent } from '../hoteldetailsimg/hoteldetailsimg.component';
import { ActivatedRoute } from '@angular/router';
import { IFilteredHotel } from '../../models/Hotel/IFilteredHotel';
import { IHotelPhotoF } from '../../models/Hotel/IHotelPhotoF';
import { environment } from '../../../environments/environment';
import { CountryService } from '../../Services/country.service';
import { HotelMapComponent } from "../admin-dashboard/hotels-dashboard/hotel-map/hotel-map.component";
import { getViewLabel, getViewsValues } from '../../utilities/getViews';

@Component({
    selector: 'app-hoteldetails',
    standalone: true,
    templateUrl: './hoteldetails.component.html',
    styleUrl: './hoteldetails.component.css',
    imports: [FormsModule, CommonModule, HoteldetailsimgComponent, KnobModule, HotelMapComponent]
})
export class HoteldetailsComponent implements OnInit {
  filteredHotel: IFilteredHotel = {} as IFilteredHotel;
  baseUrl: string = environment.baseUrl;
  hotelCoordinates = { latitude: 0, longitude: 0 };
  getViewsValues = getViewsValues;
  getViewLabel = getViewLabel;
  featureIcons: { [key: string]: string } = {
    warehouse: 'fa-warehouse',
    pool: 'fa-swimming-pool',
    gym: 'fa-dumbbell',
  };
  constructor(
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const filterHotelJson = params['filterHotel'];
      if (filterHotelJson) {
        try {
          this.filteredHotel = JSON.parse(decodeURIComponent(filterHotelJson));
          this.hotelCoordinates.latitude = this.filteredHotel.latitude;
          this.hotelCoordinates.longitude = this.filteredHotel.longitude;
        } catch (e) {
          console.error('Error parsing hotels JSON', e);
        }
      }
    });
  }
  value1!: number;
  value2!: number;
  value3!: number;
  value4!: number;
  value5!: number;
  modalImageSrc: string | null = null;
  openModal(imageSrc: string) {
    this.modalImageSrc = imageSrc;
  }
  getMainPhoto(hotel: IFilteredHotel) {
    return hotel.photos.find((photo: IHotelPhotoF) => photo.category === 1);
  }
  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return [
      ...Array(fullStars).fill('★'),
      ...Array(emptyStars).fill('☆')
    ];
  }
  getCategory2Photos() {
    return this.filteredHotel.photos
      .filter((photo: any) => photo.category === 2)
      .slice(0, 5);
  }
}
