import { Component, OnInit } from '@angular/core';
import { IHotelPhoto } from '../../../../../models/IHotelPhoto';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelPhotoService } from '../../../../../services/hotel-photo.service';
import { GeneralResponse } from '../../../../../models/GeneralResponse';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addPhoto } from '../../../../../models/addPhoto';

@Component({
  selector: 'app-add-photo',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-photo.component.html',
  styleUrl: './add-photo.component.css'
})
export class AddPhotoComponent implements OnInit {
  hotelId!: number;
  hotelPhoto: addPhoto = {} as addPhoto;
  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private hotelPhotoService: HotelPhotoService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.hotelId = +params['hotelId'];
    });
  }

  onSubmit() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('name', this.hotelPhoto.name);
      formData.append('description', this.hotelPhoto.description);
      formData.append('photo', new Blob([this.selectedFile], { type: 'application/octet-stream' }));

      this.addHotelPhoto(formData);
      this.router.navigate(["dashboard/photosDashboard", this.hotelId]);

    } else {
      console.error('No file selected.');
    }
  }

  addHotelPhoto(formData: FormData) {
    console.log(formData);
    this.hotelPhotoService.addHotelPhoto(this.hotelId, formData).subscribe((response) => {
      if (response.success) {
        console.log('Photo added successfully');
        this.router.navigate(['dashboard/photosDashboard/', this.hotelId]);
      } else {
        console.error('Error adding photo:', response.message);
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
