import { Component, TemplateRef } from '@angular/core';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';
import { HotelService } from '../../../services/hotel.service';
import { Ihotel } from '../../../models/Hotel/Ihotel';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hotels-dashboard',
  standalone: true,
  imports: [EditHotelComponent, FormsModule, CommonModule],
  templateUrl: './hotels-dashboard.component.html',
  styleUrls: ['./hotels-dashboard.component.css']
})
export class HotelsDashboardComponent {
  hotels!: Ihotel[];
  deletedItemId!: number;
  currentHotelId!: number;
  message?: string;

  constructor(
    private hotelService: HotelService,
    private router: Router,
  ) { }

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

  navigateToEdit(Id: number, hotel:Ihotel) {
    this.currentHotelId = Id;
    this.router.navigate(['dashboard/editHotel', this.currentHotelId], {
      queryParams: { hotel: JSON.stringify(hotel) }
    });
  }

  navigateToDetails(id: number) {
    this.currentHotelId = id;
    this.router.navigate(['dashboard/detailsHotel', this.currentHotelId]);
  }
  navigateToRooms(id: number) {
    this.currentHotelId = id;
    this.router.navigate(['dashboard/roomsDashboard', this.currentHotelId]);
  }
  navigateToFeatures(id: number) {
    this.currentHotelId = id;
    this.router.navigate(['dashboard/featuresDashboard', this.currentHotelId]);
  }
  navigateToPhotos(id: number) {
    this.currentHotelId = id;
    this.router.navigate(['dashboard/photosDashboard', this.currentHotelId]);
  }

  deleteHotel(id: number) {
    this.currentHotelId = id;
    this.hotelService.deleteHotel(this.currentHotelId).subscribe({
      next: (res) => { console.log(res.data); },
      error: (res) => { console.log(res.error); },
      complete: () => { console.log("complete"); }
    });
    this.router.navigate(['dashboard/hotelsDashboard']);
    window.location.reload();
  }

  goToAddPage() {
    this.router.navigate(['dashboard/addHotel']);
  }


}
