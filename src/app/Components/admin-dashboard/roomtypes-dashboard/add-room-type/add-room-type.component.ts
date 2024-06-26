import { Component } from '@angular/core';
import { IRoomType } from '../../../../models/IRoomType';
import { Router } from '@angular/router';
import { RoomTypeService } from '../../../../Services/room-type.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { NavBarComponent } from "../../../nav-bar/nav-bar.component";

@Component({
    selector: 'app-add-room-type',
    standalone: true,
    templateUrl: './add-room-type.component.html',
    styleUrl: './add-room-type.component.css',
    imports: [FormsModule, CommonModule, NavBarComponent]
})
export class AddRoomTypeComponent {

  roomType: IRoomType = {
    id: 0,
    name: "",
    pricePerNight: 0
  };
  constructor(private router: Router, private roomTypesService: RoomTypeService) {
   
  }
  
  onSubmit(roomform: NgForm) {
    if(roomform.valid) {
      this.roomTypesService.addRoomType(this.roomType).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/dashboard/roomTypesDashboard']);
        },
        error: (error) => {
          console.error('Error adding room type:', error);
        }
      });
    }
  }


  back(): void {
    this.router.navigate(['/dashboard/roomTypesDashboard']);
  }
}
