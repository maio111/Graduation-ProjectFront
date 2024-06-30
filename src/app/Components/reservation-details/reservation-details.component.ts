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
  hotel: IFilteredHotel = {} as IFilteredHotel;
  user: any;
  totalNights: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelBookingService: HotelBookingService,
    private auth: LoginService) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const roomJson = params['room'];
      if (roomJson) {
        try {
          this.room = JSON.parse(decodeURIComponent(roomJson));
        } catch (e) {
          console.error('Error parsing room JSON', e);
        }
      }
      const hotelJson = params['hotel'];
      if (roomJson) {
        try {
          this.hotel = JSON.parse(decodeURIComponent(hotelJson));
        } catch (e) {
          console.error('Error parsing hotel JSON', e);
        }
      }
    });
    this.auth.getUserById().subscribe({
      next: (res) => {
        this.user = res.data,
        console.log(this.user)
      },
      error : (err) => console.log(err)
    })
    this.booking.roomId = this.room.id;
    this.booking.hotelId = this.room.hotelId;
    this.booking.totalPrice = this.room.pricePerNight;
    this.booking.bookingDate = new Date(Date.now());
    console.log(this.user)
    this.booking.userId = this.auth.getUserIdFromLocalStorage();
  }
  submitBooking() {
    this.router.navigate(['hotelPayment'], {
      queryParams: { booking: JSON.stringify(this.booking)}
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
  calculateTotalNights() {
    const checkIn = new Date(this.booking.checkInDate);
    const checkOut = new Date(this.booking.checkOutDate);
    this.totalNights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) | 0;
  }
  updateDays() {
    this.calculateTotalNights();
  }
}
