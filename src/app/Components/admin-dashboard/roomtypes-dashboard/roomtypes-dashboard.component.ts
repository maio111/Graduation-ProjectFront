import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IRoomType } from '../../../models/IRoomType';
import { Router } from '@angular/router';
import { RoomTypeService } from '../../../Services/room-type.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-roomtypes-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,NgxPaginationModule],
  templateUrl: './roomtypes-dashboard.component.html',
  styleUrl: './roomtypes-dashboard.component.css'
})
export class RoomtypesDashboardComponent implements OnInit{
  roomTypes!: IRoomType[];
  currentTypeId!: number;
  page: any
  total: any
  constructor(private router: Router, private roomTypeService: RoomTypeService) {
    this.getAllRoomTypes();
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  getAllRoomTypes() {
    this.roomTypeService.getRoomTypes().subscribe({
      next: (res) => this.roomTypes = res.data,
      error: (err) => console.log(err)
    })
  }


  navigateToEdit(Id: number, roomType: IRoomType) {
    this.currentTypeId = Id;
    this.router.navigate(['dashboard/editRoomType', this.currentTypeId], {
      queryParams: { roomType: JSON.stringify(roomType) }
    });
  }

  deleteType(id: number) {
    this.currentTypeId = id;
    this.roomTypeService.deleteRoomType(this.currentTypeId).subscribe({
      next: (res) => { console.log(res.data); },
      error: (res) => { console.log(res.error); },
      complete: () => { console.log("complete"); }
    });
    this.router.navigate(['dashboard/roomTypesDashboard']);
    window.location.reload();
  }

  goToAddPage() {
    this.router.navigate(['dashboard/addRoomType']);
  }
  changePage(event: any) {
    this.page = event
  }
}
