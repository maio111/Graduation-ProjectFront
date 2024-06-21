import { Component } from '@angular/core';
import { IFeature } from '../../../../models/IFeature';
import { IfStmt } from '@angular/compiler';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { FeaturesService } from '../../../../services/features.service';
import { FormsModule, NgForm } from '@angular/forms';
=======
import { FeaturesService } from '../../../../Services/features.service';
import { FormsModule } from '@angular/forms';
>>>>>>> 1c87d5de527f9de3cb73461a742acf2e73673e98
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-feature-general',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-feature-general.component.html',
  styleUrl: './add-feature-general.component.css'
})
export class AddFeatureGeneralComponent {
  feature: IFeature = {} as IFeature;
  constructor(private router: Router, private featureService: FeaturesService) {
  }

  onSubmit(featureform: NgForm) {
    if (featureform.valid) {
      this.featureService.addFeature(this.feature).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/dashboard/featuresDashboardGeneral']);
        },
        error: (error) => {
          console.error('Error adding feature:', error);
        }
      });
    }
    else{
      this.markFormGroupTouched(featureform);
    }
  }

  back(): void {
    this.router.navigate(['/dashboard/featuresDashboardGeneral']);
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
