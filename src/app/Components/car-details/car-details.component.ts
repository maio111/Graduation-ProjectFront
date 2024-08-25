import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MapModalForCarComponent } from '../map-modal-for-car/map-modal-for-car.component';
import { environment } from '../../../environments/environment';
import { IFilteredCar } from '../../models/Car/IFilteredCar';
import { AuthenticationService } from '../../Services/Authentication/authentication.service';
import { ReviewService } from '../../Services/review.service';
import { ICarFilteredParams } from '../../models/Car/ICarFilteredParams';
import { CarPhotoCat } from '../../models/Car/ICarPhoto';

declare const bootstrap: any;

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, FormsModule, MapModalForCarComponent],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent implements OnInit {
  filteredCar: IFilteredCar = {} as IFilteredCar;
  params: ICarFilteredParams = {} as ICarFilteredParams;
  baseUrl: string = environment.baseUrl;
  userId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private auth: AuthenticationService,
  ) { }

  ngOnInit(): void {
    if (this.auth.getToken() != '') {
      const token = this.auth.getToken();
      const decoded = this.auth.decodeToken(token);
      this.userId = this.auth.getUserIdFromToken(decoded);
    }

    this.route.queryParams.subscribe(params => {
      const filterCarJson = params['car'];
      const paramsJson = params['params'];
      if (filterCarJson) {
        try {
          this.filteredCar = JSON.parse(decodeURIComponent(filterCarJson));
          this.params = JSON.parse(decodeURIComponent(paramsJson));
          console.log(params)
        } catch (e) {
          console.error('Error parsing car JSON', e);
        }
      }
    });
  }

  modalImageSrc: string | null = null;
  openModal1(imageSrc: string) {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
  openModal(imageSrc: string) {
    this.modalImageSrc = imageSrc;
  }

  createRent() {
    this.router.navigate(['rentDetails'], {
      queryParams: {
        car: JSON.stringify(this.filteredCar),
        Params: JSON.stringify(this.params),
        price: JSON.stringify(this.filteredCar.rentPrice)
      }
    });
  }
  getMainPhoto(): string {
    const frontViewPhoto = this.filteredCar.carPhotos?.find(photo => photo.category === CarPhotoCat.FrontView);
    return frontViewPhoto ? frontViewPhoto.photoUrl : this.defaultPhotoUrl;
  }

  defaultPhotoUrl: string = 'https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png';

}
