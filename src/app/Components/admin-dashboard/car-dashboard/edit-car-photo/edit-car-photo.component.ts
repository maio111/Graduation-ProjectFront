import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarPhotoDTO } from '../../../../models/Car/ICarPhoto';
import { CarPhotoCategory } from '../../../../models/Enums/CarPhotoCategory';
import { ActivatedRoute, Router } from '@angular/router';
import { CarPhotoServiceService } from '../../../../Services/car-photo-service.service';

@Component({
  selector: 'app-edit-car-photo',
  templateUrl: './edit-car-photo.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./edit-car-photo.component.css']
})
export class EditCarPhotoComponent implements OnInit {

  carId!: number;
  carPhoto: CarPhotoDTO = {} as CarPhotoDTO;
  selectedFile: File | null = null;
  selectedFiles: File[] = [];
  fileValidationError: boolean = false;
  categories = Object.values(CarPhotoCategory).filter(value => typeof value === 'number') as number[];

  constructor(private route: ActivatedRoute, private router: Router, private carPhotoService: CarPhotoServiceService) {
    this.route.params.subscribe(params => {
      this.carId = +params['carId'];
    });
    this.route.queryParams.subscribe(params => {
      this.carPhoto = JSON.parse(params['photo']);
    });
  }

  ngOnInit(): void {
  }

  getCategoryName(categoryId: number): string {
    return CarPhotoCategory[categoryId];
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('id', this.carPhoto.id.toString());
      formData.append('category', this.carPhoto.category.toString());
      formData.append('photo', new Blob([this.selectedFile], { type: 'application/octet-stream' }));

      this.updatePhoto(formData);
      this.router.navigate(['dashboard/carPhotos', this.carId]);
    } else {
      console.error('No file selected.');
      alert("no file selected");
    }
  }

  updatePhoto(formData: FormData) {
    this.carPhotoService.updateCarPhoto(this.carId, formData).subscribe((response) => {
      if (response.success) {
        console.log('Photo Updated successfully');
        this.router.navigate(['dashboard/carPhotos/', this.carId]);
      } else {
        console.error('Error Updating photo:', response.message);
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  back() {
    this.router.navigate(["dashboard/carPhotos", this.carId]);
  }

}
