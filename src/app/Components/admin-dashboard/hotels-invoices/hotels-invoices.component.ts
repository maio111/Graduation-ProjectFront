import { Component } from '@angular/core';
import { ViewInvoiceDTO } from '../../../models/Invoices/ViewInvoiceDTO';
import { HotelInvoicesServiceService } from '../../../Services/hotel-invoices-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-hotels-invoices',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './hotels-invoices.component.html',
  styleUrl: './hotels-invoices.component.css'
})
export class HotelsInvoicesComponent {
  invoices: ViewInvoiceDTO[] = [];
  page: any;
  total: any;
  constructor(private hotelBookingInvoiceService: HotelInvoicesServiceService) { }

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.hotelBookingInvoiceService.getHotelBookingInvoices().subscribe(
      (response: any) => {
        this.invoices = response.data;
      },
      error => {
        console.error('Error fetching invoices:', error);
      }
    );
  }

  changePage(event: any) {
    this.page = event;
  }
}
