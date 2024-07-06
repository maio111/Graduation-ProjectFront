import { Component, OnInit } from '@angular/core';
import { HotelBookingFilterDTO } from '../../../models/HotelBooking/HotelBookingFilterDTO ';
import { HotelBookingViewDTO } from '../../../models/HotelBooking/HotelBookingViewDTO ';
import { HotelBookingService } from '../../../Services/hotel-booking.service';
import { BookingStatus } from '../../../models/Enums/BookingStatus';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingStatusLabels, getBookingStatusesValues } from '../../../utilities/BookingStatus'; // Adjust the path as necessary
import { HotelService } from '../../../Services/hotel.service';

@Component({
  selector: 'app-hotel-bookings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './hotel-bookings.component.html',
  styleUrls: ['./hotel-bookings.component.css']
})
export class HotelBookingsComponent implements OnInit {
  bookings: HotelBookingViewDTO[] = [];
  filter: HotelBookingFilterDTO = {
    hotelName: '',
    checkIn: undefined,
    checkOut: undefined,
    roomNumber: undefined,
    userName: '',
    price: undefined,
    status: 0
  };
  bookingStatuses!: { label: string, value: number }[];

  constructor(private bookingService: HotelBookingService, private hotelService: HotelService) { }

  ngOnInit(): void {
    this.bookingStatuses = getBookingStatusesValues();
    this.getFilteredBookings();
    console.log(this.bookings)
  }

  getFilteredBookings(): void {
    this.bookingService.getFilteredBookings(this.filter).subscribe({
      next: (res) => this.bookings = res.data,
      error: (err) => console.log(err)
    });
  }

  applyFilter(): void {
    this.getFilteredBookings();
  }

  getBookingStatusLabel(status: BookingStatus): string {
    return BookingStatusLabels[status];
  }

  isFormValid(): boolean {
    return !!this.filter.hotelName && !!this.filter.checkIn && !!this.filter.checkOut &&
           this.filter.roomNumber !== null && this.filter.roomNumber !== undefined && 
           !!this.filter.userName && this.filter.price !== null && this.filter.price !== undefined &&
           this.filter.price >= 0 && this.filter.status !== null && this.filter.status !== undefined;
  }
}
