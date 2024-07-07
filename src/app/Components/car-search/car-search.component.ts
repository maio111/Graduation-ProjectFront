import { CommonModule } from '@angular/common';
import { Component, NgModule, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IFilteredCar, GearType } from '../../models/Car/IFilteredCar';
import { ActivatedRoute, Router } from '@angular/router';
import { ICarFilteredParams } from '../../models/Car/ICarFilteredParams';
import { CarService } from '../../Services/car.service';
import { environment } from '../../../environments/environment';
import { ICarPhoto } from '../../models/Car/ICarPhoto';
import { BookingHeaderComponent } from '../booking-header/booking-header.component';
import { CarRentalHeaderComponent } from "../car-rental-header/car-rental-header.component";
import { CarAgencyViewDto } from '../../models/Car/CarAgencyViewDto';
import { CaragencyService } from '../../Services/caragency.service';

declare var $: any;
@Component({
    selector: 'app-car-search',
    standalone: true,
    templateUrl: './car-search.component.html',
    styleUrls: ['./car-search.component.css'],
    imports: [CommonModule, FormsModule, BookingHeaderComponent, CarRentalHeaderComponent]
})
export class CarSearchComponent implements OnInit, AfterViewInit {
  filteredCars: IFilteredCar[] = [] as IFilteredCar[];
  filterParams: ICarFilteredParams = {} as ICarFilteredParams;
  minPriceVal: number = 0;
  maxPriceVal: number = 0;
  gearTypes = Object.keys(GearType).filter(k => isNaN(Number(k))).map(key => ({ label: key, value: GearType[key as keyof typeof GearType] }));

  agencies: CarAgencyViewDto[] = [] as CarAgencyViewDto[];// Populate with agency data
  baseUrl: string = environment.baseUrl;

  minPrice: number = 100;
  maxPrice: number = 5000;
  priceGap: number = 50;
  selectedAgancyId?: number;

  @ViewChild('rangeMin') rangeMin!: ElementRef<HTMLInputElement>;
  @ViewChild('rangeMax') rangeMax!: ElementRef<HTMLInputElement>;
  @ViewChild('priceMin') priceMin!: ElementRef<HTMLInputElement>;
  @ViewChild('priceMax') priceMax!: ElementRef<HTMLInputElement>;
  @ViewChild('range') range!: ElementRef<HTMLDivElement>;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router,
    private carAgencySercive : CaragencyService
  ) {}

  ngOnInit(): void {
    this.selectedAgancyId = this.agencies[0]?.id;
    this.getAgancies();
    console.log(this.agencies)
    this.route.queryParams.subscribe(params => {
      const carsJson = params['filteredCars'];
      const filterParams = params['filterParams'];
      console.log(filterParams)
      if (carsJson) {
        try {
          this.filteredCars = JSON.parse(decodeURIComponent(carsJson));
          this.filterParams = JSON.parse(decodeURIComponent(filterParams));
        } catch (e) {
          console.error('Error parsing cars JSON', e);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.rangeMin.nativeElement.addEventListener('input', () => this.updateSlider());
    this.rangeMax.nativeElement.addEventListener('input', () => this.updateSlider());
    this.priceMin.nativeElement.addEventListener('input', () => this.updateInputs());
    this.priceMax.nativeElement.addEventListener('input', () => this.updateInputs());
    this.updateSlider();
  }

  updateSlider(): void {
    let minVal = Number(this.rangeMin.nativeElement.value);
    let maxVal = Number(this.rangeMax.nativeElement.value);

    if (maxVal - minVal < this.priceGap) {
      if (event && (event.target instanceof HTMLInputElement)) {
        if (event.target.className === 'range-min') {
          this.rangeMin.nativeElement.value = (maxVal - this.priceGap).toString();
        } else {
          this.rangeMax.nativeElement.value = (minVal + this.priceGap).toString();
        }
      }
    } else {
      this.minPrice = minVal;
      this.maxPrice = maxVal;
      this.minPriceVal = minVal;
      this.maxPriceVal = maxVal;
      this.updateRangeStyles();
    }
  }

  updateInputs(): void {
    let minPrice = parseInt(this.priceMin.nativeElement.value);
    let maxPrice = parseInt(this.priceMax.nativeElement.value);

    if (maxPrice - minPrice >= this.priceGap && maxPrice <= parseInt(this.rangeMax.nativeElement.max)) {
      if (event && (event.target instanceof HTMLInputElement)) {
        if (event.target.className === 'input-min') {
          this.rangeMin.nativeElement.value = minPrice.toString();
        } else {
          this.rangeMax.nativeElement.value = maxPrice.toString();
        }
      }
      this.minPrice = minPrice;
      this.maxPrice = maxPrice;
      this.minPriceVal = minPrice;
      this.maxPriceVal = maxPrice;
      this.updateRangeStyles();
    }
  }

  private updateRangeStyles(): void {
    const minValue = parseInt(this.rangeMin.nativeElement.value);
    const maxValue = parseInt(this.rangeMax.nativeElement.value);

    const rangeWidth = parseInt(this.rangeMin.nativeElement.max);
    const leftPercentage = (minValue / rangeWidth) * 100;
    const rightPercentage = 100 - (maxValue / rangeWidth) * 100;

    this.range.nativeElement.style.left = `${leftPercentage}%`;
    this.range.nativeElement.style.right = `${rightPercentage}%`;
  }

  updateFilteredCars() {
    this.filterParams.minPrice = this.minPriceVal;
    this.filterParams.maxPrice = this.maxPriceVal;

    this.carService.getFilteredCars(this.filterParams).subscribe({
      next: (res) => {
        this.filteredCars = res;
        this.router.navigate(['/filterCar'], {
          queryParams: {
            filteredCars: encodeURIComponent(JSON.stringify(this.filteredCars)),
            filterParams: encodeURIComponent(JSON.stringify(this.filterParams))
          }
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getMainPhoto(car: IFilteredCar): ICarPhoto | null {
    if (!car.carPhotos) {
      return null;
    }
    return car.carPhotos.find(photo => photo.category == 0) || null;
  }
  

  goCarDetails(car: IFilteredCar): void {
    this.router.navigate(['/cardetails'], { queryParams: { car: encodeURIComponent(JSON.stringify(car)) } });
  }


  modelOfYearInvalid(): boolean {
    const year = this.filterParams.modelOfYear;
    return year != null && (year < 1990 || year > 2024);
  }

  getAgancies() {
    this.carAgencySercive.getAgencies().subscribe({
      next: (res) => {
        this.agencies = res.data;
      },
      error: (err) => console.log(err)
    })
  }
}
