import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddRoomDTO } from '../../../../../models/Room/AddRoomDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../../../Services/room.service';
import { HotelService } from '../../../../../services/hotel.service';
import { RoomTypeService } from '../../../../../Services/room-type.service';
import { IRoomType } from '../../../../../models/IRoomType';
import { getViewsValues } from '../../../../../utilities/getViews';

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent implements OnInit{
  room: AddRoomDTO = {
    availabilityStatus: false,
    capacity: 0,
    view: 0,
    hotelId: 0,
    roomTypeId: 0,
    isBooked: false
  };
  hotelId!: number;
  roomTypes!: IRoomType[];
  selectedRoomType!: number;
  views!: { label: string, value: number } [];
  constructor(private router: Router, private roomService: RoomService, private hotelService: HotelService, private roomTypeService: RoomTypeService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.hotelId = params['hotelId'];
    });
  }
  ngOnInit(): void {
    this.views = getViewsValues();
    this.getRoomTypes();
    this.selectedRoomType = this.roomTypes[0]?.id;
  }
  getRoomTypes() {
    this.roomTypeService.getRoomTypes().subscribe({
      next: (res) => {
        this.roomTypes = res.data;
      },
      error: (err) => console.log(err)
    })
  }

  onSubmit() {
    this.room.roomTypeId = this.selectedRoomType;
    this.room.hotelId = this.hotelId;
    this.room.view = Number(this.room.view);
    this.roomService.addRoom(this.room).subscribe(
      {
        next: (res) => {
          this.router.navigate(['/dashboard/roomsDashboard', this.hotelId]);
        },
        error: (error) => {
          console.error('Error adding hotel:', error);
        }
      }
    );
  }

  back(): void {
    this.router.navigate(['dashboard/roomsDashboard/', this.hotelId]);
  }
  
}
