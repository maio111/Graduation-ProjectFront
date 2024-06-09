import { Component } from '@angular/core';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';
import { HotelService } from '../../../services/hotel.service';
import { Hotel } from '../../../models/Hotel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { error } from 'console';
@Component({
  selector: 'app-hotels-dashboard',
  standalone: true,
  imports: [EditHotelComponent, FormsModule, CommonModule],
  templateUrl: './hotels-dashboard.component.html',
  styleUrl: './hotels-dashboard.component.css'
})
export class HotelsDashboardComponent {
  hotels!: Hotel[];
  currentHotelId!: number;
  constructor(private hotelService: HotelService, private router: Router) { }

  ngOnInit(): void {
    this.getallhotels();
  }

  getallhotels() {
    this.hotelService.getAllHotels().subscribe({
      next: (res: any) => {
        console.log(res);
        this.hotels = res.data;
      },
      error: (error) => {
        console.error('Error fetching hotels:', error);
      },
      complete: () => {
        console.log('Hotel fetching completed.');
      }
    });
  }

  navigateToEdit(id: number) {
    this.currentHotelId = id;
    this.router.navigate(['dashboard/editHotel',this.currentHotelId]);
  }
  navigateToDetails(id: number) {
    this.currentHotelId = id;
    this.router.navigate(['dashboard/detailsHotel',this.currentHotelId]);
  }

  deleteHotel(id: number) {
    this.currentHotelId = id;
    this.hotelService.deleteHotel(this.currentHotelId).subscribe({
      next: (res) => {console.log(res.data)},
      error: (res) => { console.log(res.error) },
      complete: () => {console.log("complete")}
    })
    this.router.navigate(['dashboard/adminsDashboard']);
    //window.location.reload();
  }

  goToAddPage() {
    this.router.navigate(['dashboard/addHotel']);
  }
}