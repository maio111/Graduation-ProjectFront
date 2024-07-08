import { Component } from '@angular/core';
import { BookingStatus } from '../../../models/Enums/BookingStatus';
import { BookingStatusLabels, getBookingStatusesValues } from '../../../utilities/BookingStatus';
import { CarRentalViewDTO } from '../../../models/CarRents/CarRentalViewDTO';
import { CarRentalFilterationDTO } from '../../../models/CarRents/CarRentalFilterationDTO';
import { CarRentalService } from '../../../Services/car-rental.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-rents',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './car-rents.component.html',
  styleUrl: './car-rents.component.css'
})
export class CarRentsComponent {
  rentals: CarRentalViewDTO[] = [] as CarRentalViewDTO [];
  filter: CarRentalFilterationDTO = {
    pickUpCity: '',
    pickUpDate: undefined,
    dropOffDate: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    gearType: undefined,
    modelOfYear: undefined,
    brand: '',
    numberOfSeats: undefined,
    agencyId: undefined,
  };
  gearTypes = [
    { label: 'Automatic', value: 1 },
    { label: 'Manual', value: 2 }
  ];
  bookingStatuses!: { label: string, value: number }[];

  constructor(private carRentalService: CarRentalService) { }

  ngOnInit(): void {
    this.bookingStatuses = getBookingStatusesValues();
    this.getFilteredRentals();
  }

  getFilteredRentals(): void {
    console.log(this.filter)
    this.carRentalService.getFilteredCarRentals(this.filter).subscribe({
      next: (res: { data: CarRentalViewDTO[]; }) => this.rentals = res.data,
      error: (err: any) => console.log(err)
    });
  }

  applyFilter(): void {
    this.getFilteredRentals();
  }

  getBookingStatusLabel(status: BookingStatus): string {
    return BookingStatusLabels[status];
  }

  isFormValid(): boolean {
    // return !!this.filter.pickUpCity && !!this.filter.pickUpDate && !!this.filter.dropOffDate &&
    //   this.filter.minPrice !== null && this.filter.minPrice !== undefined &&
    //   this.filter.maxPrice !== null && this.filter.maxPrice !== undefined &&
    //   this.filter.gearType !== null && this.filter.gearType !== undefined &&
    //   this.filter.modelOfYear !== null && this.filter.modelOfYear !== undefined &&
    //   !!this.filter.brand && this.filter.numberOfSeats !== null && this.filter.numberOfSeats !== undefined &&
    //   this.filter.agencyId !== null && this.filter.agencyId !== undefined;
    return true;
  }
}
