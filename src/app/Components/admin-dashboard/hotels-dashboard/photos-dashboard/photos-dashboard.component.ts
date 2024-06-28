import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HotelPhotoService } from '../../../../Services/hotel-photo.service';
import { IHotelPhoto } from '../../../../models/IHotelPhoto';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Base64ToImagePipe } from '../../../../../Pipes/base64-to-image.pipe';
import { environment } from '../../../../../environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-photos-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,Base64ToImagePipe , NgxPaginationModule],
  templateUrl: './photos-dashboard.component.html',
  styleUrl: './photos-dashboard.component.css'
})
export class PhotosDashboardComponent implements OnInit,OnChanges{
  hotelPhotos: IHotelPhoto[] = [];
  hotelId!: number;
  page:any;
  total:any
  env:string = environment.baseUrl
  constructor(
    private route: ActivatedRoute,
    private hotelPhotoService: HotelPhotoService,
    private router: Router
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadHotelPhotos();
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hotelId = +params['hotelId'];
      this.loadHotelPhotos();
    });
  }

  loadHotelPhotos() {
    this.hotelPhotoService.getHotelPhotos(this.hotelId).subscribe({
      next: (res:any) => {
        console.log(res);
        this.hotelPhotos = res.data;
        this.total=res.totalItems
        
      },
      error: (err) => {
        console.error('Error fetching hotel photos:', err);
      },
      complete: () => {
        console.log('Hotel photos fetched successfully.');
      }
    });
  }
  

  deletePhoto(photoId: number) {
    this.hotelPhotoService.deleteHotelPhoto(photoId).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err)
    }
    );
  }

  navigateToAdd() {
    this.router.navigate(["dashboard/addPhoto", this.hotelId]);
  }
  navigateToEdit(photo:IHotelPhoto) {
    this.router.navigate(["dashboard/editPhoto", this.hotelId], {
      queryParams: { photo: JSON.stringify(photo) }
    });
  }
  changePage(event:any){
    this.page=event
  }
}
