import { Component, OnInit } from '@angular/core';
import { IRoomType } from '../../../../models/IRoomType';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomTypeService } from '../../../../services/room-type.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-room-type',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-room-type.component.html',
  styleUrl: './edit-room-type.component.css'
})
export class EditRoomTypeComponent implements OnInit{
  roomType!: IRoomType;
  constructor(private router: Router,private route:ActivatedRoute, private roomTypesService: RoomTypeService) {
    this.roomType = {
      id: 0,
      name: "",
      pricePerNight: 0
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.roomType.id = params['Id'];
      this.route.queryParams.subscribe(params => {
        this.roomType = JSON.parse(params['roomType']);
      });
    });
  }

  onSubmit() {
    this.roomTypesService.updateRoomType(this.roomType.id,this.roomType).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.router.navigate(['/dashboard/roomTypesDashboard']);
        },
        error: (error) => {
          console.error('Error Updating hotel:', error);
        }
      }
    );
  }

  back(): void {
    this.router.navigate(['/dashboard/roomTypesDashboard']);
  }
}
