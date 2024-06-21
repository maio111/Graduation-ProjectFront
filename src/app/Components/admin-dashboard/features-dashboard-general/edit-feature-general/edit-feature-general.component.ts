import { Component,ViewChild } from '@angular/core';
import { IFeature } from '../../../../models/IFeature';
import { ActivatedRoute, Router } from '@angular/router';
import { FeaturesService } from '../../../../services/features.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-feature-general',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-feature-general.component.html',
  styleUrl: './edit-feature-general.component.css'
})
export class EditFeatureGeneralComponent {
  @ViewChild('typeForm') typeForm!: NgForm;
  feature: IFeature = {} as IFeature;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private featureService: FeaturesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.feature.id = +params['Id'];
    });
    this.route.queryParams.subscribe(params => {
      this.feature = JSON.parse(params['feature']);
    });
  }

  onSubmit() {
    if (this.typeForm.valid) {
      this.featureService.updateFeature(this.feature.id, this.feature).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/dashboard/featuresDashboardGeneral']);
        },
        error: (error) => {
          console.error('Error Updating feature:', error);
        }
      });
    } else {
      this.markFormControlsTouched();
    }
  }

  back(): void {
    this.router.navigate(['/dashboard/featuresDashboardGeneral']);
  }

  markFormControlsTouched() {
    Object.values(this.typeForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
