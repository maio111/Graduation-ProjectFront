import { Component, OnInit } from '@angular/core';
import { IHotelFeature } from '../../../../../models/IHotelFeature';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../../../../services/hotel.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { NgForm } from '@angular/forms';
=======
import { FeaturesService } from '../../../../../Services/features.service';
>>>>>>> 1c87d5de527f9de3cb73461a742acf2e73673e98

@Component({
  selector: 'app-add-feature',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-feature.component.html',
  styleUrls: ['./add-feature.component.css'] // Corrected here
})
export class AddFeatureComponent implements OnInit{
  selectedFeatureID!: number;
  feature: IHotelFeature = { id: 0, name: "" };
  features: IHotelFeature[] = [] as IHotelFeature[];
  hotelId!: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private featureService: FeaturesService) {
    this.route.params.subscribe((params) =>
      this.hotelId = params['hotelId']
    );
  }
  ngOnInit(): void {
    this.getFeatures();
  }

  addFeature() {
    this.hotelService.addHotelFeature(this.hotelId, this.feature).subscribe(
      {
        next: (res) => console.log(res.data),
        error: (err) => console.log(err.data)
      }
    );
  }

<<<<<<< HEAD
  onSubmit(featureform:NgForm) {
    if(featureform.valid)
      {
        this.addFeature();
=======
  getFeatures() {
    this.featureService.getFeatures().subscribe({
      next: (res) => {
        this.features = res.data;
      },
      error: (err) => console.log(err)
    })
  }
  // getFeatureById() {
  //   this.featureService.getFeatureById(this.selectedFeatureID).subscribe({
  //     next: (res) => { this.feature = res.data; console.log(res) },
  //     error: (err) => console.log(err)
  //   })
  // }

  onSubmit() {
    this.feature.id = this.selectedFeatureID;
    this.addFeature();
>>>>>>> 1c87d5de527f9de3cb73461a742acf2e73673e98
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
