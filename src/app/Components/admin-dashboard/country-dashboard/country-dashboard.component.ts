import { Component } from '@angular/core';
import { ICountry } from '../../../models/ICountry';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../../services/country.service';

@Component({
  selector: 'app-country-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './country-dashboard.component.html',
  styleUrl: './country-dashboard.component.css'
})
export class CountryDashboardComponent {
  countries!: ICountry[];
  deletedItemId!: number;
  currentCountryId!: number;
  message?: string;

  constructor(
    private countryService: CountryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllCountries();
  }

  getAllCountries() {
    this.countryService.getAllCountries().subscribe({
      next: (res: any) => {
        console.log(res);
        this.countries = res.data;
      },
      error: (error) => {
        console.error('Error fetching countries:', error);
      },
      complete: () => {
        console.log('Country fetching completed.');
      }
    });
  }

  navigateToEdit(id: number) {
    this.currentCountryId = id;
    this.router.navigate(['dashboard/editCountry', this.currentCountryId]);
  }

  navigateToDetails(id: number) {
    this.currentCountryId = id;
    this.router.navigate(['dashboard/detailsCountry', this.currentCountryId]);
  }
  navigateToCities(id: number) {
    this.currentCountryId = id;
    this.router.navigate(['dashboard/citiesDashboard', this.currentCountryId]);
  }

  deleteCountry(id: number) {
    this.currentCountryId = id;
    this.countryService.deleteCountry(this.currentCountryId).subscribe({
      next: (res) => { console.log(res.data); },
      error: (res) => { console.log(res.error); },
      complete: () => { console.log("complete"); }
    });
    this.router.navigate(['dashboard/countriesDashboard']);
    window.location.reload();
  }

  goToAddPage() {
    this.router.navigate(['dashboard/addCountry']);
  }
}

