
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CarPhotoServiceService } from '../../../../Services/car-photo-service.service';
import { ICarPhoto } from '../../../../models/Car/ICarPhoto';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Base64ToImagePipe } from '../../../../../Pipes/base64-to-image.pipe';
import { environment } from '../../../../../environments/environment';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavBarComponent } from "../../../nav-bar/nav-bar.component";

@Component({
  selector: 'app-carphotos-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, Base64ToImagePipe, NgxPaginationModule, NavBarComponent],
  templateUrl: './carphotos-dashboard.component.html',
  styleUrl: './carphotos-dashboard.component.css'
})
export class CarPhotosDashboardComponent implements OnInit, OnChanges {
  carPhotos: ICarPhoto[] = [];
  carId!: number;
  page: any;
  total: any;
  env: string = environment.baseUrl;

  constructor(
      private route: ActivatedRoute,
      private carPhotoService: CarPhotoServiceService,
      private router: Router
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
      this.loadCarPhotos();
  }

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.carId = +params['carId'];
          this.loadCarPhotos();
      });
  }

  loadCarPhotos() {
      this.carPhotoService.getCarPhotos(this.carId).subscribe({
          next: (res: any) => {
              console.log(res);
              this.carPhotos = res.data;
              this.total = res.totalItems;
          },
          error: (err) => {
              console.error('Error fetching car photos:', err);
          },
          complete: () => {
              console.log('Car photos fetched successfully.');
          }
      });
  }

  deletePhoto(photoId: number) {
      this.carPhotoService.deleteCarPhoto(photoId).subscribe({
          next: (res) => console.log(res),
          error: (err) => console.log(err)
      });
  }

  navigateToAdd() {
      this.router.navigate(["dashboard/addCarPhoto", this.carId]);
  }

  navigateToEdit(photo: ICarPhoto) {
      this.router.navigate(["dashboard/editCarPhoto", this.carId], {
          queryParams: { photo: JSON.stringify(photo) }
      });
  }

  changePage(event: any) {
      this.page = event;
  }
}
