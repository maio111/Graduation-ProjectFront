import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HotelPhotoService } from '../../../../services/hotel-photo.service';
import { IHotelPhoto } from '../../../../models/IHotelPhoto';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Base64ToImagePipe } from '../../../../../Pipes/base64-to-image.pipe';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-photos-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,Base64ToImagePipe],
  templateUrl: './photos-dashboard.component.html',
  styleUrl: './photos-dashboard.component.css'
})
export class PhotosDashboardComponent implements OnInit{
  hotelPhotos: IHotelPhoto[] = [];
  hotelId!: number;
  env:string = environment.baseUrl
  constructor(
    private route: ActivatedRoute,
    private hotelPhotoService: HotelPhotoService,
    private router: Router
  ) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hotelId = +params['hotelId'];
      this.loadHotelPhotos();
    });
  }

  loadHotelPhotos() {
    this.hotelPhotoService.getHotelPhotos(this.hotelId).subscribe({
      next: (res) => {
        this.hotelPhotos = res.data 
        console.log(res)
      },
      error: (err) => console.log(err)
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
}
