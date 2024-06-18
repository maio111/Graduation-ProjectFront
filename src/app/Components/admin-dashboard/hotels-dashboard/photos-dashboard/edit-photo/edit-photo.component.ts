import { Component } from '@angular/core';
import { addPhoto } from '../../../../../models/addPhoto';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelPhotoService } from '../../../../../services/hotel-photo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IHotelPhoto } from '../../../../../models/IHotelPhoto';

@Component({
  selector: 'app-edit-photo',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-photo.component.html',
  styleUrl: './edit-photo.component.css'
})
export class EditPhotoComponent {
  hotelId!: number;
  hotelPhoto!: IHotelPhoto;
  selectedFile: File | null = null;

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

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('id',this.hotelPhoto.id.toString())
      formData.append('name', this.hotelPhoto.name);
      formData.append('description', this.hotelPhoto.description);
      formData.append('photo', new Blob([this.selectedFile], { type: 'application/octet-stream' }));

      this.UpdatePhoto(formData);
      this.router.navigate(["dashboard/photosDashboard", this.hotelId]);

    } else {
      console.error('No file selected.');
    }
  }

  UpdatePhoto(formData: FormData) {
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
