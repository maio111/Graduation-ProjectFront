import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
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
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pagedItems: any[] = []; 
  dataService: any;
  page:any;
  total:any;

  constructor(
    private carService: CarService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAllCars(this.currentPage, this.itemsPerPage);
  }

  getAllCars(currentPage: number, itemsPerPage: number) {
    this.carService.getCars(currentPage, itemsPerPage).subscribe({
      next: (res: any) => {
        console.log(res);
        this.cars = res.data;
        this.totalItems = res.totalItems;
        this.cdr.detectChanges(); 
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
    this.router.navigate(['dashboard/editcar', id]);
  }

  deleteCar(id: number) {
    this.carService.deleteCar(id).subscribe({
      next: () => {
        this.getAllCars(this.currentPage, this.itemsPerPage); 
      },
      error: (error) => {
        console.error('Error deleting car:', error);
      },
      complete: () => {
        console.log("Deletion completed.");
      }
    });
  }

  goToAddPage() {
    this.router.navigate(['dashboard/addcar']);
  }

  changePage(event:any){
    this.page=event
  }
}
