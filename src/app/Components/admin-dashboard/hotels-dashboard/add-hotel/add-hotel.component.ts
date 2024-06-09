import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hotel } from '../../../../models/Hotel';
import { Router } from '@angular/router';
import { HotelService } from '../../../../services/hotel.service';

@Component({
  selector: 'app-add-hotel',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.css'
})
export class AddHotelComponent {
  hotel!: Hotel;
  constructor(private router: Router, private hotelService: HotelService) {
    this.hotel = {
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
  }
  onSubmit() {
    this.hotelService.addHotel(this.hotel).subscribe((res) => {
      console.log(this.hotel)
      console.log(res);
      this.router.navigate(['/dashboard/hotelsDashboard']);
    })
  }
  back(): void {
    this.router.navigate(['/dashboard/hotelsDashboard']);
  }

}
