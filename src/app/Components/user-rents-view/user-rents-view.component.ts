import { Component, TemplateRef } from '@angular/core';
import { CarRentalFiltered } from '../../models/Car/CarRentalFiltered';
import { CarRentalViewDto } from '../../models/Car/CarRentalViewDto';
import { CaragencyService } from '../../Services/caragency.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../Services/Authentication/authentication.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarInvoicesService } from '../../Services/CarInvoices.service';
import { ViewInvoiceDTO } from '../../models/Invoices/ViewInvoiceDTO';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PaymentMethod } from '../../models/Enums/PaymentMethod';
import { getPaymentMethodLabel } from '../../utilities/PaymentMethod';
import { CarRentalService } from '../../Services/CarRental.service';
import { getRentalStatusesValues, RentalStatus, RentalStatusLabels } from '../../utilities/RentalStatus';
import { CarRentalInvoicesService } from '../../Services/CarRentalInvoices.service';

@Component({
  selector: 'app-user-rentals-view',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './user-rents-view.component.html',
  styleUrls: ['./user-rents-view.component.css']
})
export class UserRentalsViewComponent {
  filter: CarRentalFiltered = {} as CarRentalFiltered;
  rentals: CarRentalViewDto[] = [] as CarRentalViewDto[];
  rentalStatuses!: { label: string, value: number }[];
  paymentMethods = PaymentMethod;

  userId!: number;
  selectedInvoice: ViewInvoiceDTO = {} as ViewInvoiceDTO;
  modalRef?: BsModalRef;
  page: any;
  total: any;

  constructor(
    private rentalService: CarRentalService,
    private auth: AuthenticationService,
    private invoiceService: CarRentalInvoicesService,
    private modalService: BsModalService
  ) {
    this.rentalStatuses = getRentalStatusesValues();
  }

  ngOnInit(): void {
    const token = this.auth.getToken();
    const decoded = this.auth.decodeToken(token);
    this.userId = this.auth.getUserIdFromToken(decoded);
    this.filter.UserId = this.userId;
    this.getFilteredRentals();
  }

  getFilteredRentals(): void {
    this.rentalService.getFilteredUserCarRentals(this.filter).subscribe({
      next: (res) => {
        this.rentals = res.data;
        this.total = res.totalItems;
        console.log(this.rentals)
      },
      error: (err) => console.log(err)
    });
  }

  applyFilter(): void {
    this.getFilteredRentals();
  }

  getRentalStatusLabel(status: RentalStatus): string | "Confirmed"{
    return RentalStatusLabels[status];
  }

  changePage(event: any) {
    this.page = event;
  }

  getInvoiceById(id: number) {
    this.invoiceService.getCarRentalInvoice(id).subscribe({
      next: (res) => {
        this.rentals = res.data;
      },
      error: (err: any) => console.log(err)
    });
  }

  openModal(id: number, template: TemplateRef<void>) {
    this.getInvoiceById(id);
    console.log(this.selectedInvoice);
    this.modalRef = this.modalService.show(template);
  }

  getPaymentMethodLabel(method: number): string {
    return getPaymentMethodLabel(method);
  }
}
