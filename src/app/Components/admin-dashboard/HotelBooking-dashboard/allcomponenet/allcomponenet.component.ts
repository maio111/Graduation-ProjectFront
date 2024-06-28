import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { HotelBookingService } from '../../../../Services/hotel-booing.service';
import { NavBarComponent } from '../../../nav-bar/nav-bar.component';

@Component({
  selector: 'app-country-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule,NavBarComponent],
  templateUrl: './Allcomponenet.component.html',
  styleUrls: ['./Allcomponenet.component.css'] 
})
export class AllcomponenetComponent implements OnInit {
  deletedItemId!: number;
  currenthotelId!: number;
  message?: string;
  hotelData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  page: any;
  total: any;

  constructor(
    private hotelBooking: HotelBookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllBooking();
  }

  getAllBooking() {
    this.hotelBooking.getAllBookings().subscribe({
      next: (res: any) => {
        console.log(res);
        this.hotelData = res;
        console.log(this.hotelData);
        this.total = res.totalItems;
      },
      error: (error) => {
        console.error('Error fetching booking:', error); 
        if (error.error) {
          console.error('Error details:', error.error);
        }
      },
      complete: () => {
        console.log('Booking fetching completed.');
      }
    });
  }




  deletebooking(id: number) {
    this.currenthotelId = id;
    this.hotelBooking.deleteBooking(this.currenthotelId).subscribe({
      next: (res) => {
      },
      error: (res) => {
        console.log(res.error);
      },
      complete: () => {
        console.log('Complete');
      }
    });
  }

 
  changePage(event:any){
    this.page=event
  }
 
}
