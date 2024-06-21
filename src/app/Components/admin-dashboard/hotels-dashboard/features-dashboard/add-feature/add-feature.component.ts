import { Component } from '@angular/core';
import { IHotelFeature } from '../../../../../models/IHotelFeature';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../../../../services/hotel.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

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

  onSubmit(featureform:NgForm) {
    if(featureform.valid)
      {
        this.addFeature();
    this.router.navigate(['/dashboard/featuresDashboard', this.hotelId]);
      }
      else
      {
        this.markFormGroupTouched(featureform);
      }
    
  }

  back(): void {
    this.router.navigate(['/dashboard/featuresDashboard',this.hotelId]);
  }
  private markFormGroupTouched(formGroup: NgForm) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.control.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }
}
