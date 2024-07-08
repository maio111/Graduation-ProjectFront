import { Component } from '@angular/core';
import { CarRentalDTO } from '../../models/CarRents/CarRentalDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../Services/Authentication/authentication.service';
import { CarPaymentService } from '../../Services/car-payment.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ICarFilteredParams } from '../../models/Car/ICarFilteredParams';
import { IFilteredCar } from '../../models/Car/IFilteredCar';

@Component({
  selector: 'app-rent-details',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './rent-details.component.html',
  styleUrl: './rent-details.component.css'
})
export class RentDetailsComponent {
  carRental: CarRentalDTO = {} as CarRentalDTO;
  car: IFilteredCar = {} as IFilteredCar;
  params: ICarFilteredParams = {} as ICarFilteredParams;
  user: any = {};
  totalDays: number = 0;
  carPrice: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.initializeCarRental()
    this.loadUserDetails();
    this.route.queryParams.subscribe(params => {
      this.parseQueryParams(params);
    });
  }

  parseQueryParams(params: any): void {
    const carJson = params['car'];
    const paramsJson = params['Params'];
    const priceJson = params['price'];

    if (carJson) {
      try {
        // this.carRental = JSON.parse(decodeURIComponent(carJson));
        this.car = JSON.parse(decodeURIComponent(carJson));
        this.carPrice = JSON.parse(decodeURIComponent(priceJson));
        this.params = JSON.parse(decodeURIComponent(paramsJson));
        this.carRental.PickUpDate = new Date(this.params.pickUpDate);
        this.carRental.DropOffDate = new Date(this.params.dropOffDate);
        this.carRental.RentDate = new Date();
        this.carRental.TotalPrice = this.carPrice * this.totalDays;
        this.carRental.UserId = this.user.id;
        this.carRental.CarId = this.car.id;
        this.carRental.CarAgencyId = this.car.carAgencyId;
        this.calculateTotalDays();
      } catch (e) {
        console.error('Error parsing car rental JSON', e);
      }
    }
  }

  loadUserDetails(): void {
    const token = this.authService.getToken();
    const decoded = this.authService.decodeToken(token);
    const userId = this.authService.getUserIdFromToken(decoded);
    this.user.id = userId
    this.authService.getUserById(userId).subscribe({
      next: (res: any) => {
        this.user = res.data;
      },
      error: (err: any) => console.error('Error loading user details', err)
    });
  }

  initializeCarRental(): void {
    if (!this.user) {
      console.error('User data is not available');
      return;
    }

    this.carRental.UserId = this.user.id;
  }

  submitrent(): void {
    this.router.navigate(['carPayment'], {
      queryParams: {
        rental: JSON.stringify(this.carRental),
        price: JSON.stringify(this.carPrice)
      }
    });
  }

  calculateTotalDays(): void {
    const pickUp = new Date(this.params.pickUpDate);
    const dropOff = new Date(this.params.dropOffDate);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const differenceMs = dropOff.getTime() - pickUp.getTime();
    this.totalDays = Math.ceil(differenceMs / millisecondsPerDay);
  }

  updateDays(): void {
    this.calculateTotalDays();
  }
}
