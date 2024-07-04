import { Component, OnInit } from '@angular/core';
import { IFilteredRoomHotel } from '../../models/Hotel/IFilteredRoomHotel';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HotelBookingService } from '../../Services/hotel-booking.service';
import { CreateBookingDTO } from '../../models/HotelBooking/CreateBookingDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../Services/Login/login.service';
import { IFilteredHotel } from '../../models/Hotel/IFilteredHotel';
import { error } from 'console';
import { IHotelFilteredParams } from '../../models/Hotel/IHotelFilteredParams';
import { AuthenticationService } from '../../Services/Authentication/authentication.service';

@Component({
  selector: 'app-reservation-details',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './reservation-details.component.html',
  styleUrl: './reservation-details.component.css'
})
export class ReservationDetailsComponent implements OnInit{
  booking: CreateBookingDTO = {} as CreateBookingDTO;
  room: IFilteredRoomHotel = {} as IFilteredRoomHotel;
  filterParams: IHotelFilteredParams = {} as IHotelFilteredParams;
  hotel: IFilteredHotel = {} as IFilteredHotel;
  user: any = {};
  totalNights: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelBookingService: HotelBookingService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.parseQueryParams(params);
    });

    this.loadUserDetails();
  }

  parseQueryParams(params: any): void {
    const roomJson = params['room'];
    const filterParamsJson = params['filterParams'];
    const hotelJson = params['hotel'];

    if (roomJson) {
      try {
        this.room = JSON.parse(decodeURIComponent(roomJson));
        this.filterParams = JSON.parse(decodeURIComponent(filterParamsJson));
        this.booking.checkInDate = new Date(this.filterParams.checkInDate);
        this.booking.checkOutDate = new Date(this.filterParams.checkOutDate);
        this.calculateTotalNights();
      } catch (e) {
        console.error('Error parsing room or filterParams JSON', e);
      }
    }

    if (hotelJson) {
      try {
        this.hotel = JSON.parse(decodeURIComponent(hotelJson));
      } catch (e) {
        console.error('Error parsing hotel JSON', e);
      }
    }
  }

  loadUserDetails(): void {
    const token = this.auth.getToken();
    const decoded = this.auth.decodeToken(token);
    const userId = this.auth.getUserIdFromToken(decoded);

    this.auth.getUserById(userId).subscribe({
      next: (res: { data: any; }) => {
        this.user = res.data;
        this.initializeBooking();
      },
      error: (err: any) => console.log(err)
    });
  }

  initializeBooking(): void {
    if (!this.user) {
      console.error('User data is not available');
      return;
    }

    this.booking.userId = this.user.id;
    this.booking.roomId = this.room.id;
    this.booking.hotelId = this.room.hotelId;
    this.booking.totalPrice = this.room.pricePerNight * this.totalNights;
    this.booking.bookingDate = new Date();
  }

  submitBooking(): void {
    this.router.navigate(['hotelPayment'], {
      queryParams: { booking: JSON.stringify(this.booking) }
    });
  }

  getStars(rating: number = 0): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return [
      ...Array(fullStars).fill('★'),
      ...Array(emptyStars).fill('☆')
    ];
  }

  calculateTotalNights(): void {
    const checkIn = new Date(this.booking.checkInDate);
    const checkOut = new Date(this.booking.checkOutDate);
    this.totalNights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  }

  updateDays(): void {
    this.calculateTotalNights();
  }
}
