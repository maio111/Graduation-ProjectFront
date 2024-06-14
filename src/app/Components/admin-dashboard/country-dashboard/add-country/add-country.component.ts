import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ICountry } from '../../../../models/ICountry';
import { Router } from '@angular/router';
import { CountryService } from '../../../../services/country.service';

@Component({
  selector: 'app-add-country',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent {
  country: ICountry = {
    id: 0,
    name: ''
  };

  constructor(private router: Router, private countryService: CountryService) { }

  onSubmit() {
    this.countryService.addCountry(this.country).subscribe({
      next: (res) => {
        console.log(this.country);
        console.log(res);
        this.router.navigate(['/dashboard/countriesDashboard']);
      },
      error: (error) => {
        console.error('Error adding country:', error);
      }
    });
  }

  back(): void {
    this.router.navigate(['/dashboard/countriesDashboard']);
  }
}
