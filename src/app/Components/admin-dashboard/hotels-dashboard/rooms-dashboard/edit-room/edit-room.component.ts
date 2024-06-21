import { Component, OnInit,ViewChild } from '@angular/core';
import { UpdateRoomDTO } from '../../../../../models/Room/UpdateRoomDTO';
import { IRoomType } from '../../../../../models/IRoomType';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../../../Services/room.service';
import { HotelService } from '../../../../../services/hotel.service';
import { RoomTypeService } from '../../../../../Services/room-type.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { NgForm } from '@angular/forms';
=======
import { getViewsValues } from '../../../../../utilities/getViews';
>>>>>>> 1c87d5de527f9de3cb73461a742acf2e73673e98

@Component({
  selector: 'app-edit-room',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {
  @ViewChild('hotelForm') hotelForm!: NgForm;
  room!: UpdateRoomDTO;
  roomId!: number;
  roomTypes: IRoomType[] = [];
  selectedRoomType!: number;
  views!: { label: string, value: number } [];
  constructor(
    private router: Router,
    private roomService: RoomService,
    private hotelService: HotelService,
    private roomTypeService: RoomTypeService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.roomId = params['Id'];
    });
  }

  ngOnInit(): void {
    this.views = getViewsValues();
    this.getRoomTypes();
    this.roomService.getRoomById(this.roomId).subscribe({
      next: (res) => {
        this.room = res.data;
        console.log(res);
        this.selectedRoomType = this.room.roomTypeId;
      },
      error: (error) => console.log(error)
    });
  }

  getRoomTypes(): void {
    this.roomTypeService.getRoomTypes().subscribe({
      next: (res) => {
        this.roomTypes = res.data;
        if (this.room && this.room.roomTypeId) {
          this.selectedRoomType = this.room.roomTypeId;
        }
      },
      error: (err) => console.log(err)
    });
  }

  onSubmit(): void {
<<<<<<< HEAD
    if (this.hotelForm.valid) {
      this.room.roomTypeId = this.selectedRoomType;
      this.roomService.updateRoom(this.roomId, this.room).subscribe({
        next: (res) => {
          this.router.navigate(['/dashboard/roomsDashboard', this.room.hotelId]);
        },
        error: (error) => {
          console.error('Error updating room:', error);
        }
      });
    } else {
      this.hotelForm.form.markAllAsTouched();
    }
=======
    this.room.roomTypeId = this.selectedRoomType;
    this.room.view = Number(this.room.view);
    this.roomService.updateRoom(this.roomId, this.room).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard/roomsDashboard', this.room.hotelId]);
      },
      error: (error) => {
        console.error('Error updating room:', error);
      }
    });
>>>>>>> 1c87d5de527f9de3cb73461a742acf2e73673e98
  }

  back(): void {
    this.router.navigate(['dashboard/roomsDashboard/', this.room.hotelId]);
  }
}
