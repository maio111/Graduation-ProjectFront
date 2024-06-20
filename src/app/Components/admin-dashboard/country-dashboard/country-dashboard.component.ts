import { Component } from '@angular/core';
import { ICountry } from '../../../models/ICountry';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountryService } from '../../../services/country.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-country-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule , NgxPaginationModule],
  templateUrl: './country-dashboard.component.html',
  styleUrl: './country-dashboard.component.css'
})
export class CountryDashboardComponent {
  
  deletedItemId!: number;
  currentCountryId!: number;
  message?: string;

  countries: any[] = []; // Assuming you have an array of countries
  pagedItems: any[] = []; // Array to hold currently displayed page items
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 10; // Items per page
  dataService: any;
  page:any;
  total:any;

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
        this.total=res.totalItems
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

  changePage(event:any){
    this.page=event
  }
}

