import { Component, OnInit } from '@angular/core';
import { BulkCarPhotoDTO } from '../../../../models/CarPhoto/BulkCarPhotoDTO';
import { CarPhotoCategory } from '../../../../models/Enums/CarPhotoCategory';
import { CarPhotoCategories } from '../../../../models/Enums/CarPhotoCategories';
import { ActivatedRoute, Router } from '@angular/router';
import { CarPhotoServiceService } from '../../../../Services/car-photo-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-car-photo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-car-photo.component.html',
  styleUrls: ['./add-car-photo.component.css']
})
export class AddCarPhotoComponent implements OnInit {
  carId!: number;
  CarPhotos: BulkCarPhotoDTO = { photos: [], category : CarPhotoCategories.FrontView };
  selectedFiles: File[] = [];
  fileValidationError: boolean = false;
  categories = Object.values(CarPhotoCategory).filter(value => typeof value === 'number') as number[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carPhotoService: CarPhotoServiceService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.carId = +params['carId'];
    });
  }

  getCategoryName(categoryId: number): string {
    return CarPhotoCategory[categoryId];
  }

  onSubmit() {
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append('category', this.CarPhotos.category.toString());

      this.selectedFiles.forEach(file => {
        formData.append('photos', file, file.name);
      });

      this.addHotelPhotos(formData);
    } else {
      console.error('No files selected.');
      this.fileValidationError = true;
    }
  }

  addHotelPhotos(formData: FormData) {
    this.carPhotoService.addCarPhotos(this.carId, formData).subscribe(
      response => {
        console.log('Response from server:', response);
        if (response.success) {
          console.log('Photos added successfully');
          this.router.navigate(['dashboard/carPhotos/', this.carId]);
        } else {
          console.error('Server returned error:', response.message);
        }
      },
      error => {
        console.error('Error adding photos:', error);
      }
    );
  }

  onFilesSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedFiles = Array.from(files);
      this.fileValidationError = false; 
    } else {
      this.fileValidationError = true;
    }
  }

  back() {
    this.router.navigate(['dashboard/photosDashboard', this.carId]);
  }
}
