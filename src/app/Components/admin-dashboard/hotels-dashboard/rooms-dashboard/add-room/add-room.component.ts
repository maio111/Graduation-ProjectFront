import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IRoom } from '../../../../../models/IRoom';
import { AddRoomDTO } from '../../../../../models/Room/AddRoomDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../../../services/room.service';
import { HotelService } from '../../../../../services/hotel.service';

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent {
  room: AddRoomDTO = {
    availabilityStatus: false,
    capacity: 0,
    view: 0,
    hotelId: 0,
    roomTypeId: 0,
    isBooked: false
  };
  hotelId!: number;
  constructor(private router: Router, private roomService: RoomService,private hotelService:HotelService, private route: ActivatedRoute) { 
    this.route.params.subscribe((params) => {
      this.hotelId = params['Id'];
    });

    this.hotelService.getHotelById(this.hotelId).subscribe((res) => {
      console.log(res.data)
    });
    this.hotelId = this.hotelId;
    this.room.hotelId = this.hotelId;
  }

  onSubmit() {
    this.roomService.addRoom(this.room).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.router.navigate(['/dashboard/roomsDashboard']);
        },
        error: (error) => {
          console.error('Error adding hotel:', error);
        }
      }
    );
  }

  back(): void {
    this.router.navigate(['/dashboard/roomsDashboard',this.hotelId]);
  }
}
