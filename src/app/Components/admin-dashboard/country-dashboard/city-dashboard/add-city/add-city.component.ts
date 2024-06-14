import { Component } from '@angular/core';
import { ICity } from '../../../../../models/City/ICity';
import { CityService } from '../../../../../services/city.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-city',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.css'
})
export class AddCityComponent {
  countryId!: number;
  city: ICity = {} as ICity
  selectedCityId!: number;
  constructor(private router: Router, private cityService: CityService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.countryId = params['Id'];
    });
  }
  onSubmit() {
    this.city.countryId = this.countryId;
    this.cityService.addCity(this.city).subscribe(
      {
        next: (res) => {
          this.router.navigate(['/dashboard/citiesDashboard', this.countryId]);
        },
        error: (error) => {
          console.error('Error adding city:', error);
        }
      }
    );
  }

  back(): void {
    this.router.navigate(['dashboard/citiessDashboard/', this.countryId]);
  }
}
