import { Component } from '@angular/core';
import { RoomsViewDTO } from '../../../../models/Room/RoomsViewDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../../Services/room.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HotelService } from '../../../../services/hotel.service';
import { Ihotel } from '../../../../models/Hotel/Ihotel';
import { AddRoomDTO } from '../../../../models/Room/AddRoomDTO';
<<<<<<< HEAD
import { getViewLabel, getViewsValues } from '../../../../utilities/getViews';
import { View } from '../../../../models/Enums/View';
=======
import { NgxPaginationModule } from 'ngx-pagination';
>>>>>>> 0d6cb45fd0e2c8ef5a6e397abce9e654abfe394d

@Component({
  selector: 'app-rooms-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './rooms-dashboard.component.html',
  styleUrl: './rooms-dashboard.component.css'
})
export class RoomsDashboardComponent {
  room: RoomsViewDTO = {} as RoomsViewDTO;
  hotelId!: number;
  currentRoomId!: number;
  rooms!: RoomsViewDTO[];
  hotel!: Ihotel;
<<<<<<< HEAD
  viewEnum = View;
=======
  page: number = 1; // initialize page to 1
  total: number = 0; // initialize total to 0

>>>>>>> 0d6cb45fd0e2c8ef5a6e397abce9e654abfe394d
  constructor(private router: Router, private roomService: RoomService, private hotelService: HotelService, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.hotelId = params['Id'];
    });
    this.hotelService.getHotelById(this.hotelId).subscribe((res) => {
      this.hotel = res.data;
<<<<<<< HEAD
=======
      
      console.log(res.data)
>>>>>>> 0d6cb45fd0e2c8ef5a6e397abce9e654abfe394d
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
<<<<<<< HEAD
  getViewLabel(value: number): string {
    return getViewLabel(value);
  }
}
=======

  changePage(event: any) {
    this.page = event;
    console.log('Total items:', this.total);
    this.getallRooms();
  }
}
>>>>>>> 0d6cb45fd0e2c8ef5a6e397abce9e654abfe394d
