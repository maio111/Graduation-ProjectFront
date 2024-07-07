
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavBarComponent } from '../../../nav-bar/nav-bar.component';
import { CaragencyService } from '../../../../Services/caragency.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-car-agency',
  standalone: true,
  imports: [CommonModule,FormsModule,NgxPaginationModule,NavBarComponent],
  templateUrl: './caragency.component.html',
  styleUrl: './caragency.component.css'
})
export class CaragencyComponent {

  caragencies: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  pagedItems: any[] = []; 
  dataService: any;
  page:any;
  total:any;
  baseUrl = environment.baseUrl;

 
  constructor(
    private carAgencyService: CaragencyService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getAllCarAgencies();
  }

  getAllCarAgencies() {
    this.carAgencyService.getCarAgencies().subscribe({
      next: (res: any) => {
        console.log(res);
        this.caragencies = res.data;
        this.totalItems = res.totalItems;
        this.cdr.detectChanges(); 
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
        this.getAllCarAgencies(); 
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
  navigateToCars(carAgencyId: number): void {
    this.router.navigate(['dashboard/cars', carAgencyId]); 
  }
  changePage(event:any){
    this.page=event
  }
}
