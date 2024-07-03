import { Component } from '@angular/core';
import { UserBookingsFilter } from '../../models/HotelBooking/UserBookingsFilter';
import { UserBookingsViewDTO } from '../../models/HotelBooking/UserBookingsViewDTO';
import { HotelBookingService } from '../../Services/hotel-booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingStatus } from '../../models/Enums/BookingStatus';
import { BookingStatusLabels, getBookingStatusesValues } from '../../utilities/BookingStatus';
import { AuthenticationService } from '../../Services/Authentication/authentication.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-user-bookings-view',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './user-bookings-view.component.html',
  styleUrl: './user-bookings-view.component.css'
})
export class UserBookingsViewComponent {
  filter: UserBookingsFilter = {} as UserBookingsFilter;
  bookings: UserBookingsViewDTO[] = [] as UserBookingsViewDTO[];
  bookingStatuses!: { label: string, value: number }[];
  userId!: number;
  page: any;
  total: any;
  constructor(private bookingService: HotelBookingService, private auth: AuthenticationService) {
    this.bookingStatuses = getBookingStatusesValues();
  }

  ngOnInit(): void {
    const token = this.auth.getToken();
    const decoded = this.auth.decodeToken(token);
    this.userId = this.auth.getUserIdFromToken(decoded);
    this.filter.UserId = this.userId;
    this.getFilteredBookings();
  }

  getFilteredBookings(): void {
    this.bookingService.getFilteredUserBookings(this.filter).subscribe({
      next: (res) => {
        this.bookings = res.data
      },
      error: (err) => console.log(err)
    })
  }

  applyFilter(): void {
    this.getFilteredBookings();
  }
  getBookingStatusLabel(status: BookingStatus): string {
    return BookingStatusLabels[status];
  }
  changePage(event: any) {
    this.page = event;
  }
}
