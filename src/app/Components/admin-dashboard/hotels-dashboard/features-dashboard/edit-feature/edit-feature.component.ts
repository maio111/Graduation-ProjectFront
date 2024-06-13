import { Component } from '@angular/core';
import { IHotelFeature } from '../../../../../models/IHotelFeature';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../../../../services/hotel.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-feature',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-feature.component.html',
  styleUrl: './edit-feature.component.css'
})
export class EditFeatureComponent {
  feature!: IHotelFeature;
  hotelId!: number;

  constructor(private route: ActivatedRoute, private router: Router, private hotelService: HotelService) {
    this.route.params.subscribe(params => {
      this.hotelId = +params['hotelId'];
    });

    this.route.queryParams.subscribe(params => {
      this.feature = JSON.parse(params['feature']);
    });
  }

  updateFeature() {
    this.hotelService.updateHotelFeature(this.hotelId, this.feature).subscribe(
      (res) => {
        console.log('Update successful:', res);
        this.router.navigate(['/dashboard/featuresDashboard', this.hotelId]);
      },
      (error) => {
        console.error('Update error:', error);
      }
    );
  }

  onSubmit() {
    this.updateFeature();
  }

  back(): void {
    this.router.navigate(['/dashboard/featuresDashboard', this.hotelId]);
  }
}
