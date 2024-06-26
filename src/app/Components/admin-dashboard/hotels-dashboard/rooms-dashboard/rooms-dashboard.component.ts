import { Component } from '@angular/core';
import { RoomsViewDTO } from '../../../../models/Room/RoomsViewDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../../Services/room.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HotelService } from '../../../../Services/hotel.service';
import { Ihotel } from '../../../../models/Hotel/Ihotel';
import { AddRoomDTO } from '../../../../models/Room/AddRoomDTO';
import { NgxPaginationModule } from 'ngx-pagination';
import { getViewLabel } from '../../../../utilities/getViews';
import { NavBarComponent } from "../../../nav-bar/nav-bar.component";

@Component({
    selector: 'app-rooms-dashboard',
    standalone: true,
    templateUrl: './rooms-dashboard.component.html',
    styleUrl: './rooms-dashboard.component.css',
    imports: [FormsModule, CommonModule, NgxPaginationModule, NavBarComponent]
})
export class RoomsDashboardComponent {
  room: RoomsViewDTO = {} as RoomsViewDTO;
  hotelId!: number;
  currentRoomId!: number;
  rooms!: RoomsViewDTO[];
  hotel!: Ihotel;
  page: number = 1; // initialize page to 1
  total: number = 0; // initialize total to 0

  constructor(private router: Router, private roomService: RoomService, private hotelService: HotelService, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.hotelId = params['Id'];
    });
    this.hotelService.getHotelById(this.hotelId).subscribe((res) => {
      this.hotel = res.data;
      console.log(res.data)
    });
    this.getallRooms();
  }

  getallRooms() {
    this.roomService.getHotelRooms(this.hotelId, ["RoomType", "Hotel"]).subscribe({
      next: (res: any) => {
        this.rooms = res.data;
        this.total = res.totalItems; // update total with the total number of items
      },
      error: (error) => {
        console.error('Error fetching hotels:', error);
      },
      complete: () => {
        console.log('Hotel fetching completed.');
      }
    });
  }

  navigateToEdit(Id: number) {
    this.currentRoomId = Id;
    this.router.navigate(['dashboard/editRoom', this.currentRoomId]);
  }

  deleteRoom(id: number) {
    this.currentRoomId = id;
    this.roomService.deleteRoom(this.currentRoomId).subscribe({
      next: (res) => { console.log(res.data); },
      error: (res) => { console.log(res.error); },
      complete: () => { console.log("complete"); }
    });
    this.router.navigate(['dashboard/roomsDahboard']);
    window.location.reload();
  }

  goToAddPage() {
    this.router.navigate(['/dashboard/addRoom', this.hotelId]);
  }
  getViewLabel(value: number): string {
    return getViewLabel(value);
  }
  changePage(event: any) {
    this.page = event;
    console.log('Total items:', this.total);
    this.getallRooms();
  }
}
