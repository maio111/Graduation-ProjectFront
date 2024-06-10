import { Component } from '@angular/core';
import { ICountry } from '../../../models/ICountry';
import { CountryService } from '../../../services/country.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule
  ],
  templateUrl: './country-dashboard.component.html',
  styleUrl: './country-dashboard.component.css'
})
export class CountryDashboardComponent {
  country: ICountry =
{
  name: '',
  latitude: 0,
  longitude: 0

    };
  constructor(private router: Router, private countryService: CountryService) { }

  onSubmit() {
    this.countryService.addCountry(this.country).subscribe({
      next: (res) => {
        console.log(this.country);
        console.log(res);
        this.router.navigate(['/dashboard/countriesDashboard']); // Adjust the path as necessary
      },
      error: (error) => {
        console.error('Error adding country:', error);
      }
    });
  }

  back(): void {
    this.router.navigate(['/dashboard/countriesDashboard']); // Adjust the path as necessary
  }

};
