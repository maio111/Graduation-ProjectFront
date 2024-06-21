import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormsModule, NgModel } from '@angular/forms';
import { AddRoomDTO } from '../../../../../models/Room/AddRoomDTO';
import { NgForm } from '@angular/forms';
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
<<<<<<< HEAD

  constructor(
    private router: Router,
    private roomService: RoomService,
    private roomTypeService: RoomTypeService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.hotelId = +params['hotelId'];
=======
  views!: { label: string, value: number } [];
  constructor(private router: Router, private roomService: RoomService, private hotelService: HotelService, private roomTypeService: RoomTypeService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.hotelId = params['hotelId'];
>>>>>>> 1c87d5de527f9de3cb73461a742acf2e73673e98
    });
  }

  ngOnInit(): void {
    this.views = getViewsValues();
    this.getRoomTypes();
<<<<<<< HEAD
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
=======
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
>>>>>>> 1c87d5de527f9de3cb73461a742acf2e73673e98
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

