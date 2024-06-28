import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelPhotoService } from '../../../../../Services/hotel-photo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { PhotoCategory } from '../../../../../models/Enums/PhotoCategory'; // Adjust the path as necessary
import { BulkHotelPhotoDTO } from '../../../../../models/HotelPhoto/BulkHotelPhotoDTO';

@Component({
  selector: 'app-add-photo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-photo.component.html',
  styleUrl: './add-photo.component.css'
=======
import { addPhoto } from '../../../../../models/addPhoto';
import { NgForm } from '@angular/forms';
import { NavBarComponent } from "../../../../nav-bar/nav-bar.component";

@Component({
    selector: 'app-add-photo',
    standalone: true,
    templateUrl: './add-photo.component.html',
    styleUrl: './add-photo.component.css',
    imports: [FormsModule, CommonModule, NavBarComponent]
>>>>>>> df1f1e146533ad8e6673fb4bcd52077828a9126c
})
export class AddPhotoComponent implements OnInit {
  hotelId!: number;
  hotelPhotos: BulkHotelPhotoDTO = { photos: [], category: PhotoCategory.FrontView };
  selectedFiles: File[] = [];
  fileValidationError: boolean = false;
  categories = Object.values(PhotoCategory).filter(value => typeof value === 'number') as number[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelPhotoService: HotelPhotoService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = +params['hotelId'];
    });
  }

  getCategoryName(categoryId: number): string {
    return PhotoCategory[categoryId];
  }

  onSubmit() {
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append('category', this.hotelPhotos.category.toString());

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
    this.hotelPhotoService.addHotelPhotos(this.hotelId, formData).subscribe(
      response => {
        console.log('Response from server:', response);
        if (response.success) {
          console.log('Photos added successfully');
          this.router.navigate(['dashboard/photosDashboard/', this.hotelId]);
        } else {
          console.error('Server returned error:', response.message);
          // Handle error condition, show message to user or retry logic
        }
      },
      error => {
        console.error('Error adding photos:', error);
        // Handle network or other errors, show message to user or retry logic
      }
    );
  }

  onFilesSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedFiles = Array.from(files);
      this.fileValidationError = false; // Reset the validation error when files are selected
    } else {
      this.fileValidationError = true;
    }
  }

  back() {
    this.router.navigate(['dashboard/photosDashboard', this.hotelId]);
  }
}
