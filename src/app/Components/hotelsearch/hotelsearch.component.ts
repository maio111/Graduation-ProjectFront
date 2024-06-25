import { CommonModule } from '@angular/common';
import { Component, NgModule , ViewChild, ElementRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider'; 
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
declare var $: any;
@Component({
  selector: 'app-hotelsearch',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './hotelsearch.component.html',
  styleUrl: './hotelsearch.component.css'
})
export class HotelsearchComponent  {

  minPrice: number = 5000; // Initial values
  maxPrice: number = 30000;
  priceGap: number = 1000;

  @ViewChild('rangeMin') rangeMin!: ElementRef<HTMLInputElement>;
  @ViewChild('rangeMax') rangeMax!: ElementRef<HTMLInputElement>;
  @ViewChild('priceMin') priceMin!: ElementRef<HTMLInputElement>;
  @ViewChild('priceMax') priceMax!: ElementRef<HTMLInputElement>;
  @ViewChild('range') range!: ElementRef<HTMLDivElement>;
  hotels = [
    {
      name: 'Three House Hotel',
      location: 'Santa Maria, Funchal - 450 m from centre',
      ratingText: 'Exceptional',
      rating: 9.6,
      comfort: 9.8,
      nights: 16,
      adults: 2,
      price: 179270,
      image: '../../../assets/img/hb2.jpg'
    },
    {
      name: 'Pestana Grand Ocean Resort Hotel',
      location: 'Sao Martinho, Funchal - 3.7 km from centre',
      ratingText: 'Very good',
      rating: 8.4,
      comfort: 8.8,
      nights: 16,
      adults: 2,
      price: 225795,
      image: '../../../assets/img/hotel1.jpg'
    }
  ];

  ngAfterViewInit(): void {
    this.rangeMin.nativeElement.addEventListener('input', () => this.updateSlider());
    this.rangeMax.nativeElement.addEventListener('input', () => this.updateSlider());
    this.priceMin.nativeElement.addEventListener('input', () => this.updateInputs());
    this.priceMax.nativeElement.addEventListener('input', () => this.updateInputs());

    // Initialize slider positions
    this.updateSlider();
  }

  updateSlider(): void {
    let minVal = parseInt(this.rangeMin.nativeElement.value);
    let maxVal = parseInt(this.rangeMax.nativeElement.value);

    if (maxVal - minVal < this.priceGap) {
      if (event && (event.target instanceof HTMLInputElement)) {
        if (event.target.className === 'range-min') {
          this.rangeMin.nativeElement.value = (maxVal - this.priceGap).toString();
        } else {
          this.rangeMax.nativeElement.value = (minVal + this.priceGap).toString();
        }
      }
    } else {
      this.minPrice = minVal; // Update component property
      this.maxPrice = maxVal; // Update component property
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
      this.minPrice = minPrice; // Update component property
      this.maxPrice = maxPrice; // Update component property
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
    // Placeholder for the wishlist logic
    console.log(`Toggling wishlist status for hotel: ${hotel.name}`);
  }

}
