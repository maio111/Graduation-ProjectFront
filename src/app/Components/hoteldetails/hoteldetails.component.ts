import { CommonModule } from '@angular/common';
import { Component, OnInit, numberAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { HoteldetailsimgComponent } from '../hoteldetailsimg/hoteldetailsimg.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IFilteredHotel } from '../../models/Hotel/IFilteredHotel';
import { IHotelPhotoF } from '../../models/Hotel/IHotelPhotoF';
import { environment } from '../../../environments/environment';
import { CountryService } from '../../Services/country.service';
import { HotelMapComponent } from "../admin-dashboard/hotels-dashboard/hotel-map/hotel-map.component";
import { getViewLabel, getViewsValues } from '../../utilities/getViews';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { IRoomType } from '../../models/IRoomType';
import { RoomTypeService } from '../../Services/room-type.service';
import { CreateBookingDTO } from '../../models/HotelBooking/CreateBookingDTO';
import { IRoom } from '../../models/IRoom';
import { IFilteredRoomHotel } from '../../models/Hotel/IFilteredRoomHotel';
import { json } from 'stream/consumers';


@Component({
    selector: 'app-hoteldetails',
    standalone: true,
    templateUrl: './hoteldetails.component.html',
    styleUrl: './hoteldetails.component.css',
    imports: [FormsModule, CommonModule, HoteldetailsimgComponent, KnobModule,HotelMapComponent, NavBarComponent]
})
export class HoteldetailsComponent implements OnInit {
  roomTypes: IRoomType[] = [] as IRoomType[];
  views!: { label: string, value: number }[];
  filteredHotel: IFilteredHotel = {} as IFilteredHotel;
  baseUrl: string = environment.baseUrl;
  hotelCoordinates = { latitude: 0, longitude: 0 };
  booking!: CreateBookingDTO;
  getViewsValues = getViewsValues;
  getViewLabel = getViewLabel;
  featureIcons: { [key: string]: string } = {
    warehouse: 'fa-warehouse',
    pool: 'fa-swimming-pool',
    gym: 'fa-dumbbell',
    Wifi: 'fa-solid fa-wifi',
    spa:'fa-solid fa-spa',
    parking :'fa-solid fa-square-parking',
    bathroom :'fa-solid fa-bath',
    shuttle: 'fa-solid fa-van-shuttle',
    balcony : 'fa-solid fa-torii-gate',
    bar :'fa-solid fa-martini-glass-citrus',
    'kids area': 'fa-solid fa-children',
    'Facilities for disabled guests': 'fa-solid fa-wheelchair',
    'wellness care':'fa-solid fa-staff-snake'
   
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.views = getViewsValues();
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
      .slice(0, 6);
  }
  createBooking(room: IFilteredRoomHotel) {
    this.router.navigate(['reservationDetails'], {
      queryParams: { room: JSON.stringify(room) }
    });
  }
}
