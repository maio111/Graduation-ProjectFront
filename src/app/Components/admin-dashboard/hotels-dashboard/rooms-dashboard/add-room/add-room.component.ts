import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormsModule, NgModel } from '@angular/forms';
import { AddRoomDTO } from '../../../../../models/Room/AddRoomDTO';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../../../services/room.service';
import { HotelService } from '../../../../../services/hotel.service';
import { RoomTypeService } from '../../../../../services/room-type.service';
import { IRoomType } from '../../../../../models/IRoomType';

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent implements OnInit {
  @ViewChild('hotelForm') hotelForm!: NgForm;
  room: AddRoomDTO = {
    availabilityStatus: false,
    capacity: {} as number,
    view: {} as number ,
    hotelId: 0,
    roomTypeId: 0,
    isBooked: false
  };
  hotelId!: number;
  roomTypes: IRoomType[] = [];
  selectedRoomType!: number;

  constructor(
    private router: Router,
    private roomService: RoomService,
    private roomTypeService: RoomTypeService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.hotelId = +params['hotelId'];
    });
  }

  ngOnInit(): void {
    this.getRoomTypes();
  }

  getRoomTypes(): void {
    this.roomTypeService.getRoomTypes().subscribe({
      next: res => {
        this.roomTypes = res.data;
        if (this.roomTypes.length > 0) {
          this.selectedRoomType = this.roomTypes[0].id;
        }
      },
      error: err => console.log(err)
    });
  }

  onSubmit(): void {
    if (this.hotelForm.valid) {
      this.room.roomTypeId = this.selectedRoomType;
      this.room.hotelId = this.hotelId;
      this.roomService.addRoom(this.room).subscribe({
        next: res => {
          console.log(res);
          this.router.navigate(['/dashboard/roomsDashboard', this.hotelId]);
        },
        error: error => {
          console.error('Error adding room:', error);
        }
      });
    } else {
      this.hotelForm.form.markAllAsTouched();
    }
  }

  back(): void {
    this.router.navigate(['/dashboard/roomsDashboard', this.hotelId]);
  }
}

