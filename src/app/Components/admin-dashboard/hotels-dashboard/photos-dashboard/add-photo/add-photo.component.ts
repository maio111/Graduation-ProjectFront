import { Component, OnInit } from '@angular/core';
import { IHotelPhoto } from '../../../../../models/IHotelPhoto';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelPhotoService } from '../../../../../Services/hotel-photo.service';
import { GeneralResponse } from '../../../../../models/GeneralResponse';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addPhoto } from '../../../../../models/addPhoto';
import { NgForm } from '@angular/forms';
import { NavBarComponent } from "../../../../nav-bar/nav-bar.component";

@Component({
    selector: 'app-add-photo',
    standalone: true,
    templateUrl: './add-photo.component.html',
    styleUrl: './add-photo.component.css',
    imports: [FormsModule, CommonModule, NavBarComponent]
})
export class AddPhotoComponent implements OnInit {
  hotelId!: number;
  hotelPhoto: addPhoto = {} as addPhoto;
  selectedFile: File | null = null;
  fileValidationError: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private hotelPhotoService: HotelPhotoService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = +params['hotelId'];
    });
  }

  onSubmit(photoForm: NgForm) {
    if (photoForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.hotelPhoto.name);
      formData.append('description', this.hotelPhoto.description);
      formData.append('photo', this.selectedFile);

      this.addHotelPhoto(formData);
    } else {
      console.error('Form is invalid or no file selected.');
      photoForm.form.markAllAsTouched(); // Mark all fields as touched to trigger validation messages

      if (!this.selectedFile) {
        this.fileValidationError = true;
      }
    }
  }

  addHotelPhoto(formData: FormData) {
    this.hotelPhotoService.addHotelPhoto(this.hotelId, formData).subscribe(response => {
      if (response.success) {
        console.log('Photo added successfully');
        this.router.navigate(['dashboard/photosDashboard/', this.hotelId]);
      } else {
        console.error('Error adding photo:', response.message);
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileValidationError = false; // Reset the validation error when a file is selected
    } else {
      this.fileValidationError = true;
    }
  }

  back() {
    this.router.navigate(['dashboard/photosDashboard', this.hotelId]);
  }
}
