import { Component, OnInit } from '@angular/core';
import { IFilteredRoomHotel } from '../../models/Hotel/IFilteredRoomHotel';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HotelBookingService } from '../../Services/hotel-booking.service';
import { CreateBookingDTO } from '../../models/HotelBooking/CreateBookingDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../Services/Login/login.service';

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
  user: any;
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
          console.error('Error parsing hotels JSON', e);
        }
      }
    });
    console.log(this.room)
    this.user = this.auth.currentUser
    this.booking.roomId = this.room.id;
    this.booking.hotelId = this.room.hotelId;
    this.booking.totalPrice = this.room.pricePerNight;
    this.booking.bookingDate = new Date(Date.now());
    console.log(this.user)
    this.booking.userId = this.auth.getUserIdFromLocalStorage();
  }
  submitBooking() {
    this.hotelBookingService.createBooking(this.booking).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    })
  }
}
