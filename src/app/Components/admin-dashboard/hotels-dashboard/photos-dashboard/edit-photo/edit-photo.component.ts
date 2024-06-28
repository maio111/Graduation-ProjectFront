import { Component } from '@angular/core';
import { addPhoto } from '../../../../../models/addPhoto';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelPhotoService } from '../../../../../Services/hotel-photo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IHotelPhoto } from '../../../../../models/IHotelPhoto';
import { NavBarComponent } from "../../../../nav-bar/nav-bar.component";
import { PhotoCategory } from '../../../../../models/Enums/PhotoCategory';

@Component({
    selector: 'app-edit-photo',
    standalone: true,
    templateUrl: './edit-photo.component.html',
    styleUrl: './edit-photo.component.css',
    imports: [FormsModule, CommonModule, NavBarComponent]
})
export class EditPhotoComponent {
  hotelId!: number;
  hotelPhoto: addPhoto = {} as addPhoto;
  selectedFile: File | null = null;
  selectedFiles: File[] = [];
  fileValidationError: boolean = false;
  categories = Object.values(PhotoCategory).filter(value => typeof value === 'number') as number[];

  constructor(private route: ActivatedRoute, private router: Router, private hotelPhotoService: HotelPhotoService) {
    this.route.params.subscribe(params => {
      this.hotelId = +params['hotelId'];
    });
    this.route.queryParams.subscribe(params => {
      this.hotelPhoto = JSON.parse(params['photo']);
    });
  }

  ngOnInit(): void {
  }

  getCategoryName(categoryId: number): string { 
    return PhotoCategory[categoryId];
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('id', this.hotelPhoto.id.toString());
      formData.append('category', this.hotelPhoto.category.toString());
      formData.append('photo', new Blob([this.selectedFile], { type: 'application/octet-stream' }));

      this.updatePhoto(formData);
      this.router.navigate(["dashboard/photosDashboard", this.hotelId]);

    } else {
      console.error('No file selected.');
    }
  }

  updatePhoto(formData: FormData) {
    this.hotelPhotoService.updateHotelPhoto(this.hotelId, formData).subscribe((response) => {
      if (response.success) {
        console.log('Photo Updated successfully');
        this.router.navigate(['dashboard/photosDashboard/', this.hotelId]);
      } else {
        console.error('Error Updating photo:', response.message);
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  back() {
    this.router.navigate(["dashboard/photosDashboard", this.hotelId]);
  }

}
