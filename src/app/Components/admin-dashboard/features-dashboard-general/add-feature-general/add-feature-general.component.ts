import { Component } from '@angular/core';
import { IFeature } from '../../../../models/IFeature';
import { IfStmt } from '@angular/compiler';
import { Router } from '@angular/router';
import { FeaturesService } from '../../../../services/features.service';
import { FormsModule } from '@angular/forms';
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

  onSubmit() {
    this.featureService.addFeature(this.feature).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.router.navigate(['/dashboard/featuresDashboardGeneral']);
        },
        error: (error) => {
          console.error('Error adding Feature:', error);
        }
      }
    );
  }

  back(): void {
    this.router.navigate(['/dashboard/featuresDashboardGeneral']);
  }
}
