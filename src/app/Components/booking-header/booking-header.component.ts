import { Component, Input, input } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { CalendarModule } from 'primeng/calendar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import flatpickr from 'flatpickr';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CityService } from '../../Services/city.service';
import { ICity } from '../../models/City/ICity';
import { HotelService } from '../../Services/hotel.service';
import { IFilteredHotel } from '../../models/Hotel/IFilteredHotel';
import { IHotelFilteredParams } from '../../models/Hotel/IHotelFilteredParams';
import { CommonModule } from '@angular/common';
import { checkInDateValidator, checkOutDateValidator } from '../../Validators/date';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, map, of, startWith } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { json } from 'stream/consumers';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-booking-header',
  standalone: true,
  imports: [NavBarComponent,
    CalendarModule,
    FormsModule,
    FooterComponent,
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule],
  templateUrl: './booking-header.component.html',
  styleUrl: './booking-header.component.css'
})
export class BookingHeaderComponent {
  cities: ICity[] = [] as ICity[];
  filteredCities$: Observable<ICity[]> | undefined;
  showDropdown: boolean = false;
  filteredHotels: IFilteredHotel [] = [] as IFilteredHotel[];
  bookingForm!: FormGroup;
  @Input() parmas: IHotelFilteredParams = {} as IHotelFilteredParams;
  constructor(
    private citiesService: CityService,
    private hotelService: HotelService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }
  onFocus(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.parentElement?.querySelector('label')?.classList.add('filled');
  }

  onBlur(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value === '') {
      input.parentElement?.querySelector('label')?.classList.remove('filled');
    }
  }

  ngAfterViewInit(): void {
    flatpickr("#checkin", {
      dateFormat: "Y-m-d"
    });
    flatpickr("#checkout", {
      dateFormat: "Y-m-d"
    });
  }
  ngOnInit(): void {
    this.getAllCities();
    this.swipeAnimation(".destinations", [".destinations .heading", ".destinations .content"]);
    this.galleryAnimation(".destinations .gallery", [
      ".destinations .gallery .box1",
      ".destinations .gallery .box2",
      ".destinations .gallery .box3",
      ".destinations .gallery .box4",
      ".destinations .gallery .box5"
    ]);
    this.swipeAnimation(".article", [".article .latest-article", ".article .box1", ".article .box2", ".article .box3", ".article .box4"]);
    this.scrollTriggerAnimation(".travel", [".travel .box1", ".travel .box2", ".travel .box3"]);
    this.scrollTriggerAnimation(".article", [".article .label", ".article .heading"]);
    this.galleryAnimation(".feedback .voices", [".feedback .voices .box1", ".feedback .voices .box2", ".feedback .voices .box3", ".feedback .voices .box4", ".feedback .voices .box5", ".feedback .voices .box6"]);
    this.scrollTriggerAnimation(".feedback .container", [".feedback .label", ".feedback .heading", ".feedback .paragraph"]);
    //Form Validations
    this.bookingForm = this.formBuilder.group({
      checkInDate: ['', [Validators.required, checkInDateValidator()]],
      checkOutDate: ['', [Validators.required]],
      roomCapacity: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      cityId: ['', [Validators.required]]
    });
    const checkInControl = this.bookingForm.get('checkInDate');
    const checkOutControl = this.bookingForm.get('checkOutDate');

    if (checkInControl && checkOutControl) {
      checkOutControl.setValidators([Validators.required, checkOutDateValidator(checkInControl)]);

      checkInControl.valueChanges.subscribe(() => {
        checkOutControl.updateValueAndValidity();
      });
    }
    this.filteredCities$ = this.bookingForm.get('cityId')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCities(value))
    );
  }
  private _filterCities(value: string): ICity[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(city => city.name.toLowerCase().includes(filterValue));
  }
  selectCity(city: ICity): void {
    this.bookingForm.get('cityId')!.setValue(city.name);
    this.parmas.cityId = city.id;
    this.showDropdown = false;
  }

  onCityFocus(): void {
    this.showDropdown = true;
  }

  onCityBlur(): void {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200); // Delay to allow click on dropdown items
  }

  onCityInput(): void {
    const value = this.bookingForm.get('cityId')?.value || '';
    this.filteredCities$ = of(this._filterCities(value));
    this.showDropdown = true;
  }

  swipeAnimation(triggerSelector: string, boxSelectors: string[]): void {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerSelector,
        start: "top 50%",
        end: "top 100%",
        scrub: 3,
      },
    });

    boxSelectors.forEach((boxSelector) => {
      timeline.to(boxSelector, {
        x: 0,
        duration: 1,
        opacity: 1,
      });
    });
  }

  galleryAnimation(triggerSelector: string, boxSelectors: string[]): void {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerSelector,
        start: "top 100%",
        end: "bottom 100%",
        scrub: 1,
      },
    });

    boxSelectors.forEach((boxSelector) => {
      timeline.to(boxSelector, {
        y: 0,
        opacity: 1,
        duration: 1,
      });
    });
  }

  scrollTriggerAnimation(triggerSelector: string, boxSelectors: string[]): void {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerSelector,
        start: "top 50%",
        end: "top 80%",
        scrub: 1,
      },
    });

    boxSelectors.forEach((boxSelector) => {
      timeline.to(boxSelector, {
        y: 0,
        duration: 1,
        opacity: 1,
      });
    });
  }
  getAllCities() {
    this.citiesService.getAllCities().subscribe({
      next: (res) => { this.cities = res.data },
      error: (error) => console.log(error)
    })
  }
  onSearch() {
    if (this.bookingForm.valid) {
      this.hotelService.getFilteredHotels(this.parmas).subscribe({
        next: (res) => {
          this.filteredHotels = res.data
          console.log(res.data)
          
          const filteredHotels = JSON.stringify(this.filteredHotels);
          const filterParams = JSON.stringify(this.parmas);
          this.router.navigate(['filterhotels'], {
            queryParams: { filterParams: filterParams, filteredHotels: filteredHotels }
          });
        },
        error: (error) => console.log(error)
      });
    }
  }
}
