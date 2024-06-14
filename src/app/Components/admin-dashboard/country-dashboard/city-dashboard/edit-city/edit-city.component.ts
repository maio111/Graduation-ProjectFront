import { Component } from '@angular/core';
import { ICity } from '../../../../../models/City/ICity';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from '../../../../../services/city.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-city',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-city.component.html',
  styleUrl: './edit-city.component.css'
})
export class EditCityComponent {
  countryId!: number;
  city: ICity = {} as ICity
  selectedCityId!: number;
  constructor(private router: Router, private cityService: CityService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.countryId = params['Id'];
      this.route.queryParams.subscribe(params => {
        this.city = JSON.parse(params['city']);
        this.selectedCityId = this.city.id;
      });
    });
  }
  onSubmit() {
    this.city.countryId = this.countryId;
    this.cityService.updateCity(this.city.id,this.city).subscribe(
      {
        next: (res) => {
          this.router.navigate(['/dashboard/citiesDashboard', this.countryId]);
        },
        error: (error) => {
          console.error('Error Updated city:', error);
        }
      }
    );
  }

  back(): void {
    this.router.navigate(['dashboard/citiesDashboard/', this.countryId]);
  }
}
