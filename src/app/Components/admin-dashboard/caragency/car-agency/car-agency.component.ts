
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavBarComponent } from '../../../nav-bar/nav-bar.component';
import { CaragencyService } from '../../../../Services/caragency.service';

@Component({
  selector: 'app-car-agency',
  standalone: true,
  imports: [CommonModule,FormsModule,NgxPaginationModule,NavBarComponent],
  templateUrl: './car-agency.component.html',
  styleUrl: './car-agency.component.css'
})
export class CaragencyComponent implements OnInit {
  caragencies: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pagedItems: any[] = []; 
  dataService: any;
  page:any;
  total:any;

  constructor(
    private carAgencyService: CaragencyService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAllCarAgencies(this.currentPage, this.itemsPerPage);
  }

  getAllCarAgencies(currentPage: number, itemsPerPage: number) {
    this.carAgencyService.getCarAgencies(currentPage, itemsPerPage).subscribe({
      next: (res: any) => {
        console.log(res);
        this.caragencies = res.data;
        this.totalItems = res.totalItems;
        this.cdr.detectChanges(); // Ensure change detection is triggered
      },
      error: (error) => {
        console.error('Error fetching car agencies:', error);
      },
      complete: () => {
        console.log('Car agency fetching completed.');
      }
    });
  }

  navigateToEdit(id: number) {
    this.router.navigate(['dashboard/editcaragency', id]);
  }

  deleteCarAgency(id: number) {
    this.carAgencyService.deleteCarAgency(id).subscribe({
      next: () => {
        this.getAllCarAgencies(this.currentPage, this.itemsPerPage); 
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
    this.router.navigate(['dashboard/addcaragency']);
  }

  changePage(event:any){
    this.page=event
  }
}
