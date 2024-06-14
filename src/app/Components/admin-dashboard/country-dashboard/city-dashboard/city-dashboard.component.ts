import { Component } from '@angular/core';
import { ICity } from '../../../../models/City/ICity';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from '../../../../services/city.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './city-dashboard.component.html',
  styleUrl: './city-dashboard.component.css'
})
export class CityDashboardComponent {
  countryId!: number;
  currentCityId!: number;
  cities: ICity[] = [] as ICity[];
  constructor(private router: Router, private cityService: CityService, private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.countryId = params['Id'];
    });
    this.GetAllCities();
  }

  GetAllCities() {
    this.cityService.getCountryCities(this.countryId, ["Country"]).subscribe({
      next: (res: any) => {
        console.log(res);
        this.cities = res.data;
      },
      error: (error) => {
        console.error('Error fetching Cities:', error);
      },
      complete: () => {
        console.log('Cities fetching completed.');
      }
    });
  }

  navigateToEdit(Id: number,city:ICity) {
    this.currentCityId = Id;
    this.router.navigate(['dashboard/editCity', this.countryId], {
      queryParams: { city: JSON.stringify(city) }
    });
  }

  deleteCity(id: number) {
    this.currentCityId = id;
    this.cityService.deleteCity(this.currentCityId).subscribe({
      next: (res) => { console.log(res.data); },
      error: (res) => { console.log(res.error); },
      complete: () => { console.log("complete"); }
    });
    window.location.reload();
  }

  goToAddPage() {
    this.router.navigate(['/dashboard/addCity', this.countryId]);
  }
}
