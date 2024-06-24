import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { HotelBookingService } from '../../../../Services/hotel-booing.service';

@Component({
  selector: 'app-country-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule , NgxPaginationModule],
  templateUrl: './Allcomponenet.component.html',
  styleUrl: './Allcomponenet.component.css'
})
export class AllcomponenetComponent
{
  
  deletedItemId!: number;
  currenthotelId!: number;
  message?: string;

  hotelData: any[] = []; 
  pagedItems: any[] = []; 
  currentPage: number = 1; 
  itemsPerPage: number = 10; 
  dataService: any;
  page:any;
  total:any;

  constructor(
    private hotelBooking: HotelBookingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllCountries();
  }

  getAllCountries() {
    this.hotelBooking.getAllBookings().subscribe({
      next: (res: any) => {
        console.log(res);
        this.hotelData = res;
        console.log(this.hotelData)
        this.total=res.totalItems
      },
      error: (error) => {
        console.error('Error fetching booking:', error);
      },
      complete: () => {
        console.log('booking fetching completed.');
      }
    });
  }

  navigateToEdit(id: number) {
    this.currenthotelId = id;
    this.router.navigate(['', this.currenthotelId]);
  }

  navigateToDetails(id: number) {
    this.currenthotelId = id;
    this.router.navigate(['', this.currenthotelId]);
  }
  navigateToCities(id: number) {
    this.currenthotelId= id;
    this.router.navigate(['', this.currenthotelId]);
  }

  deletebooking(id: number) {
    this.currenthotelId = id;
    this.hotelBooking.deleteBooking(this.currenthotelId).subscribe({
      next: (res) => { console.log(res); },
      error: (res) => { console.log(res.error); },
      complete: () => { console.log("complete"); }
    });
    window.location.reload();
  }

  goToAddPage() {
    this.router.navigate(['']);
  }

  changePage(event:any){
    this.page=event
  }
}

