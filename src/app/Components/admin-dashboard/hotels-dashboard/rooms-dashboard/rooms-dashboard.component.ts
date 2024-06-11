import { Component } from '@angular/core';
import { RoomsViewDTO } from '../../../../models/Room/RoomsViewDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../../services/room.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HotelService } from '../../../../services/hotel.service';
import { Ihotel } from '../../../../models/Hotel/Ihotel';
import { AddRoomDTO } from '../../../../models/Room/AddRoomDTO';

@Component({
  selector: 'app-rooms-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './rooms-dashboard.component.html',
  styleUrl: './rooms-dashboard.component.css'
})
export class RoomsDashboardComponent {
  room: RoomsViewDTO = {
    id: 0,
    availabilityStatus: false,
    capacity: 0,
    view: 0,
    hotelName: "",
    typeName: "",
    pricePerNight: 0,
    isBooked: false,
  };
  hotelId!: number;
  currentRoomId!: number;
  rooms!: RoomsViewDTO[];
  hotel!: Ihotel;
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
    this.roomService.getHotelRooms(this.hotelId,["RoomType","Hotel"]).subscribe({
      next: (res: any) => {
        console.log(res);
        this.rooms = res.data;
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
    this.router.navigate(['/dashboard/addRoom',this.hotelId]);
  }
}
