import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavBarComponent } from '../../../nav-bar/nav-bar.component';
import { CarService } from '../../../../Services/car.service';

@Component({
  selector: 'app-car-agency',
  standalone: true,
  imports: [CommonModule,FormsModule,NgxPaginationModule,NavBarComponent],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css'
})
export class CarComponent {

  cars: any[] = [];
  agencyId!: number;
  currentCarId!: number;
  page: number = 1;
  total: number = 0;

  constructor(
    private router: Router,
    private carService: CarService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.agencyId = params['id'];
      this.getAllCars();
    });
  }

  getAllCars() {
    this.carService.getAgencyCars(this.agencyId).subscribe({
      next: (res: any) => {
        this.cars = res.data;
        console.log(this.cars);
        this.total = res.totalItems;
      },
      error: (error) => {
        console.error('Error fetching cars:', error);
      },
      complete: () => {
        console.log('Car fetching completed.');
      }
    });
  }

  navigateToEdit(id: number) {
    this.currentCarId = id;
    this.router.navigate(['dashboard/editcar', this.currentCarId]);
  }

  
  deleteCar(id: number) {
    this.currentCarId = id;
    this.carService.deleteCar(this.currentCarId).subscribe({
      next: () => {
        this.getAllCars(); 
      },
      error: (error) => {
        console.error('Error deleting car agency:', error);
      },
      complete: () => {
        console.log("Deletion completed.");
      }
    });
  }

  goToAddPage() {
    this.router.navigate(['dashboard/addcar', this.agencyId]);
  }

  changePage(event: any) {
    this.page = event;
  }
}