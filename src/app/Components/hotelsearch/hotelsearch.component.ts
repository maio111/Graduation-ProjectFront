import { CommonModule } from '@angular/common';
import { Component, NgModule, ViewChild, ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IFilteredHotel } from '../../models/Hotel/IFilteredHotel';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotelFilteredParams } from '../../models/Hotel/IHotelFilteredParams';
import { IRoomType } from '../../models/IRoomType';
import { RoomTypeService } from '../../Services/room-type.service';
import { getViewsValues } from '../../utilities/getViews';
import { FeaturesService } from '../../Services/features.service';
import { IFeature } from '../../models/IFeature';
import { HotelService } from '../../Services/hotel.service';
import { environment } from '../../../environments/environment';
import { IHotelPhotoF } from '../../models/Hotel/IHotelPhotoF';
import { BookingHeaderComponent } from "../booking-header/booking-header.component";

declare var $: any;
@Component({
  selector: 'app-hotelsearch',
  standalone: true,
  templateUrl: './hotelsearch.component.html',
  styleUrl: './hotelsearch.component.css',
  imports: [FormsModule, CommonModule, BookingHeaderComponent]
})
export class HotelsearchComponent implements OnInit {
  filteredHotels: IFilteredHotel[] = [] as IFilteredHotel[];
  filterParams: IHotelFilteredParams = {} as IHotelFilteredParams
  roomTypes: IRoomType[] = [] as IRoomType[];
  features: IFeature[] = [] as IFeature[];
  views!: { label: string, value: number }[];
  selectedRoomTypeId!: number;
  minPriceVal: number = 0;
  maxPriceVal: number = 0;
  selectedFeatureIds: number[] = [];
  baseUrl: string = environment.baseUrl;

  constructor(private route: ActivatedRoute,
    private roomTypeService: RoomTypeService,
    private featuresService: FeaturesService,
    private hotelService: HotelService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.selectedRoomTypeId = this.roomTypes[0]?.id;
    this.getRoomTypes();
    this.getAllFeatures();
    this.views = getViewsValues();

    this.route.queryParams.subscribe(params => {
      const hotelsJson = params['filteredHotels'];
      const filterParams = params['filterParams'];
      if (hotelsJson) {
        try {
          this.filteredHotels = JSON.parse(decodeURIComponent(hotelsJson));
          this.filterParams = JSON.parse(decodeURIComponent(filterParams));
          console.log(this.filterParams)
        } catch (e) {
          console.error('Error parsing hotels JSON', e);
        }
      }
    });
  }

  minPrice: number = 100;
  maxPrice: number = 5000;
  priceGap: number = 50;

  @ViewChild('rangeMin') rangeMin!: ElementRef<HTMLInputElement>;
  @ViewChild('rangeMax') rangeMax!: ElementRef<HTMLInputElement>;
  @ViewChild('priceMin') priceMin!: ElementRef<HTMLInputElement>;
  @ViewChild('priceMax') priceMax!: ElementRef<HTMLInputElement>;
  @ViewChild('range') range!: ElementRef<HTMLDivElement>;

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

  toggleWishlist(hotel: any): void {
    console.log(`Toggling wishlist status for hotel: ${hotel.name}`);
  }

  getRoomTypes() {
    this.roomTypeService.getRoomTypes().subscribe({
      next: (res) => {
        this.roomTypes = res.data;
      },
      error: (err) => console.log(err)
    })
  }
  getAllFeatures() {
    this.featuresService.getFeatures().subscribe({
      next: (res) => {
        this.features = res.data;
      },
      error: (err) => console.log(err)
    })
  }
  updateFilteredHotel() {
    this.filterParams.minPrice = this.minPriceVal;
    this.filterParams.maxPrice = this.maxPriceVal;
    this.filterParams.roomTypeId = this.selectedRoomTypeId;
    this.filterParams.featureIds = this.selectedFeatureIds;
    console.log(this.filterParams)
    this.hotelService.getFilteredHotels(this.filterParams).subscribe({
      next: (res) => {
        this.filteredHotels = res.data
        console.log(res.data)
      },
      error: (error) => console.log(error)
    });
  }
  addToSelectedFeatures(featureId: number): void {
    if (!this.selectedFeatureIds.includes(featureId)) {
      this.selectedFeatureIds.push(featureId);
      this.updateFilteredHotel();
    }
  }

  removeFromSelectedFeatures(featureId: number): void {
    const index = this.selectedFeatureIds.indexOf(featureId);
    if (index !== -1) {
      this.selectedFeatureIds.splice(index, 1);
      this.updateFilteredHotel();
    }
  }



  isSelectedFeature(featureId: number): boolean {
    return this.selectedFeatureIds.includes(featureId);
  }

  featureCheckboxChanged(target: any): void {
    if (target instanceof HTMLInputElement) {
      const featureId = parseInt(target.id.replace('feature', ''));
      if (target.checked) {
        this.addToSelectedFeatures(featureId);
      } else {
        this.removeFromSelectedFeatures(featureId);
      }
    }
  }

  getMainPhoto(hotel: IFilteredHotel) {
    return hotel.photos.find((photo: IHotelPhotoF) => photo.category === 1);
  }

  goHotelDetails(hotel: IFilteredHotel) {
    this.router.navigate(['hoteldetails'],
      {
        queryParams: {
          filterHotel: encodeURIComponent(JSON.stringify(hotel)),
          filterParams: encodeURIComponent(JSON.stringify(this.filterParams))
        }
      })
  }
}

