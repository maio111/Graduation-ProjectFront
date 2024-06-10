import { Component, TemplateRef } from '@angular/core';
import { Ihotel } from '../../../../models/Hotel/Ihotel';
import { HotelService } from '../../../../services/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edit-hotel',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-hotel.component.html',
  styleUrl: './edit-hotel.component.css'
})
export class EditHotelComponent {
  hotel: Ihotel = {
    id: 0,
    name: '',
    description: '',
    rating: 0,
    phoneNumber: '',
    email: '',
    websiteURL: '',
    latitude: 0,
    longitude: 0
  };
  hotelId!: number;
  constructor(private router: Router, private hotelService: HotelService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.hotelId = params['Id'];
    });

    this.hotelService.getHotelById(this.hotelId).subscribe((res) => {
      console.log(res.data)
      this.hotel = res;
    });
    this.hotel.id = this.hotelId;
  }

  onSubmit() {
    this.hotelService.updateHotel(this.hotelId, this.hotel).subscribe(
      {
        next: (res) => {
          console.log(this.hotel);
          console.log(res);
          this.router.navigate(['dashboard/hotelsDashboard']);
        },
        error: (error) => {
          console.log(this.hotel)
          console.error('Error adding hotel:', error);
        }
      }
    );
  }

  back(): void {
    this.router.navigate(['/dashboard/hotelsDashboard']);
  }
}