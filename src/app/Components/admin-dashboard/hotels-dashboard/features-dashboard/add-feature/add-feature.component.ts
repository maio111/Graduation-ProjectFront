import { Component } from '@angular/core';
import { IHotelFeature } from '../../../../../models/IHotelFeature';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../../../../services/hotel.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-feature',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.css'] // Corrected here
})
export class AddFeatureComponent {
  feature: IHotelFeature = {id:0,name:""};
  hotelId!: number;

  constructor(private route: ActivatedRoute, private router: Router, private hotelService: HotelService) {
    this.route.params.subscribe((params) =>
      this.hotelId = params['hotelId']
    );
  }

  addFeature() {
    this.hotelService.addHotelFeature(this.hotelId, this.feature).subscribe(
      {
        next: (res) => console.log(res.data),
        error: (err) => console.log(err.data)
      }
    );
  }

  onSubmit() {
    this.addFeature();
    this.router.navigate(['/dashboard/featuresDashboard', this.hotelId]);
  }

  back(): void {
    this.router.navigate(['/dashboard/featuresDashboard',this.hotelId]);
  }
}
