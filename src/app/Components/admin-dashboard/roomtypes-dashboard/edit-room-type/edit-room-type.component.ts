import { Component, OnInit } from '@angular/core';
import { IRoomType } from '../../../../models/IRoomType';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomTypeService } from '../../../../Services/room-type.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { NavBarComponent } from "../../../nav-bar/nav-bar.component";

@Component({
    selector: 'app-edit-room-type',
    standalone: true,
    templateUrl: './edit-room-type.component.html',
    styleUrl: './edit-room-type.component.css',
    imports: [FormsModule, CommonModule, NavBarComponent]
})
export class EditRoomTypeComponent implements OnInit{
  roomType: IRoomType = {
    id: 0,
    name: "",
    pricePerNight: 0
  };
  constructor(private router: Router,private route:ActivatedRoute, private roomTypesService: RoomTypeService) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.roomType.id = params['Id'];
      this.route.queryParams.subscribe(params => {
        this.roomType = JSON.parse(params['roomType']);
      });
    });
  }

  onSubmit(roomform: NgForm) {
    if (roomform.valid) {
      this.roomTypesService.updateRoomType(this.roomType.id, this.roomType).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/dashboard/roomTypesDashboard']);
        },
        error: (error) => {
          console.error('Error updating room type:', error);
        }
      });
    }
  }

  back(): void {
    this.router.navigate(['/dashboard/roomTypesDashboard']);
  }
}
