import { Component, TemplateRef } from '@angular/core';
import { UserBookingsFilter } from '../../models/HotelBooking/UserBookingsFilter';
import { UserBookingsViewDTO } from '../../models/HotelBooking/UserBookingsViewDTO';
import { HotelBookingService } from '../../Services/hotel-booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingStatus } from '../../models/Enums/BookingStatus';
import { BookingStatusLabels, getBookingStatusesValues } from '../../utilities/BookingStatus';
import { AuthenticationService } from '../../Services/Authentication/authentication.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { HotelInvoicesServiceService } from '../../Services/hotel-invoices-service.service';
import { ViewInvoiceDTO } from '../../models/Invoices/ViewInvoiceDTO';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PaymentMethod } from '../../models/Enums/PaymentMethod';
import { getPaymentMethodLabel } from '../../utilities/PaymentMethod';

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
  paymentMethods = PaymentMethod;

  userId!: number;
  selectedInvoice: ViewInvoiceDTO = {} as ViewInvoiceDTO;
  modalRef?: BsModalRef;
  page: any;
  total: any;
  constructor(
    private bookingService: HotelBookingService,
    private auth: AuthenticationService,
    private invoiceService: HotelInvoicesServiceService,
    private modalService: BsModalService
  ) {
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

  getInvoiceById(id: number) {
    this.invoiceService.getInvoiceByBookingId(id).subscribe({
      next: (res) => {
        this.selectedInvoice = res.data
      },
      error: (err) => console.log(err)
    })
  }
  openModal(id: number, template: TemplateRef<void>) {
    this.getInvoiceById(id);
    console.log(this.selectedInvoice)
    this.modalRef = this.modalService.show(template);
  }
  getPaymentMethodLabel(method: number): string {
    return getPaymentMethodLabel(method);
  }
}
