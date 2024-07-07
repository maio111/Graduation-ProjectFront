import { Component, OnInit } from '@angular/core';
import { CarRentalViewDto } from '../../../models/Car/CarRentalViewDto';
import { CarRentalInvoicesService } from '../../../Services/CarRentalInvoices.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarRentalInvoiceDTO } from '../../../models/Car/CarRentalInvoiceDTO';

@Component({
  selector: 'app-car-rental-invoices',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './car-rental-invoices.component.html',
  styleUrl: './car-rental-invoices.component.css'
})
export class CarRentalInvoicesComponent implements OnInit {
  invoices:CarRentalInvoiceDTO[] = [];
  page: number = 1;
  total: number = 0;

  constructor(private carRentalInvoiceService: CarRentalInvoicesService) { }

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.carRentalInvoiceService.getCarRentalInvoices().subscribe(
      (response: { data: CarRentalInvoiceDTO[], totalItems: number }) => {
        this.invoices = response.data;
        this.total = response.totalItems;
      },
      error => {
        console.error('Error fetching invoices:', error);
      }
    );
  }

  changePage(event: number): void {
    this.page = event;
  }
}
