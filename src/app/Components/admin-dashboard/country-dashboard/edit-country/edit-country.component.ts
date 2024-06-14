import { Component, OnInit } from '@angular/core';
import { ICountry } from '../../../../models/ICountry';
import { CountryService } from '../../../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-country',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.css']
})
export class EditCountryComponent implements OnInit {
  country: ICountry = {
    id: 0,
    name: ''
  };
  countryId!: number;

  constructor(
    private router: Router, 
    private countryService: CountryService, 
    private route: ActivatedRoute
  ) {
    // Use ngOnInit for initialization
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.countryId = +params['Id']; // Ensure countryId is a number
      this.loadCountry();
    });
  }

  loadCountry() {
    this.countryService.getCountryById(this.countryId).subscribe({
      next: (res) => 
        this.country.id = res.id
     
      
    });
  }

  onSubmit() {
    this.country.id = this.countryId
    this.countryService.updateCountry(this.countryId, this.country).subscribe({
      next: res => {
        console.log('Country updated successfully:', res);
         this.router.navigate(['/dashboard/countriesDashboard']);
      },
      error: error => {
        console.error('Error updating country:', error);
      }
    });
  }

  back(): void {
    this.router.navigate(['/dashboard/countriesDashboard']);
  }
}
