import { Component } from '@angular/core';
import { IFeature } from '../../../models/IFeature';
import { Router } from '@angular/router';
import { FeaturesService } from '../../../services/features.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features-dashboard-general',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './features-dashboard-general.component.html',
  styleUrl: './features-dashboard-general.component.css'
})
export class FeaturesDashboardGeneralComponent {
  features: IFeature[] = [] as IFeature[]
  currentFeatureId!: number;
  constructor(private router: Router, private featureService: FeaturesService) {

  }
  ngOnInit(): void {
    this.getAllFeatures();
  }
  getAllFeatures() {
    this.featureService.getFeatures().subscribe({
      next: (res) => this.features = res.data,
      error: (err) => console.log(err)
    })
  }


  navigateToEdit(Id: number, feature: IFeature) {
    this.currentFeatureId = Id;
    this.router.navigate(['dashboard/editFeatureGeneral', this.currentFeatureId], {
      queryParams: { feature: JSON.stringify(feature) }
    });
  }

  deleteFeature(id: number) {
    this.currentFeatureId = id;
    this.featureService.deleteFeature(this.currentFeatureId).subscribe({
      next: (res) => { console.log(res.data); },
      error: (res) => { console.log(res.error); },
      complete: () => { console.log("complete"); }
    });
    this.router.navigate(['dashboard/featuresDashboardGeneral']);
    window.location.reload();
  }

  goToAddPage() {
    this.router.navigate(['dashboard/addFeatureGeneral']);
  }
}
