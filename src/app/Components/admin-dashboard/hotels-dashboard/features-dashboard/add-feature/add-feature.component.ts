import { Component, OnInit } from '@angular/core';
import { IHotelFeature } from '../../../../../models/IHotelFeature';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../../../../Services/hotel.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeaturesService } from '../../../../../Services/features.service';
import { NavBarComponent } from "../../../../nav-bar/nav-bar.component";

@Component({
    selector: 'app-add-feature',
    standalone: true,
    templateUrl: './add-feature.component.html',
    styleUrls: ['./add-feature.component.css'] // Corrected here
    ,
    imports: [FormsModule, CommonModule, NavBarComponent]
})
export class AddFeatureComponent implements OnInit {
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
  getFeatures() {
    this.featureService.getFeatures().subscribe({
      next: (res) => {
        this.features = res.data;
      },
      error: (err) => console.log(err)
    })
  }
  getFeatureById() {
    this.featureService.getFeatureById(this.selectedFeatureID).subscribe({
      next: (res) => { this.feature = res.data; console.log(res) },
      error: (err) => console.log(err)
    })
  }
  onSubmit(featureform: NgForm) {
    if (featureform.valid) {
      this.feature.id = this.selectedFeatureID;
      this.addFeature();
      this.router.navigate(['/dashboard/featuresDashboard', this.hotelId]);
    }
    else {
      this.markFormGroupTouched(featureform);
    }

  }

  back(): void {
    this.router.navigate(['/dashboard/featuresDashboard', this.hotelId]);
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
