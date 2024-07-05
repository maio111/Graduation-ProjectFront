import { CommonModule } from '@angular/common';
import { Component, ElementRef ,ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarRentalHeaderComponent } from "../car-rental-header/car-rental-header.component";

@Component({
    selector: 'app-car-search',
    standalone: true,
    templateUrl: './car-search.component.html',
    styleUrl: './car-search.component.css',
    imports: [CommonModule, FormsModule, CarRentalHeaderComponent]
})
export class CarSearchComponent {
  minPrice: number = 100;
  maxPrice: number = 5000;
  priceGap: number = 50;

  @ViewChild('rangeMin') rangeMin!: ElementRef<HTMLInputElement>;
  @ViewChild('rangeMax') rangeMax!: ElementRef<HTMLInputElement>;

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
    }
  }

  updateInputs(): void {
    let minPrice = parseInt(this.minPrice.toString());
    let maxPrice = parseInt(this.maxPrice.toString());

    if (maxPrice - minPrice >= this.priceGap && maxPrice <= 5000) {
      if (event && (event.target instanceof HTMLInputElement)) {
        if (event.target.className === 'input-min') {
          this.rangeMin.nativeElement.value = minPrice.toString();
        } else {
          this.rangeMax.nativeElement.value = maxPrice.toString();
        }
      }
      this.minPrice = minPrice;
      this.maxPrice = maxPrice;
    }
  }

  getProgressLeft() {
    return ((this.minPrice - 100) / (5000 - 100)) * 100 + '%';
  }

  getProgressRight() {
    return ((5000 - this.maxPrice) / (5000 - 100)) * 100 + '%';
  }
  cards = [
    {
      image: '../../../assets/img/ca2.jpg',
      name: 'Car Name 1',
      price: 12354.00,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum. Asperiores accusamus harum ducimus velit odit ut. Saepe, iste optio laudantium sed aliquam sequi.',
      visible: true
    },
    {
      image: '../../../assets/img/ca2.jpg',
      name: 'Car Name 2',
      price: 12354.00,
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam quidem eaque ut eveniet aut quis rerum. Asperiores accusamus harum ducimus velit odit ut. Saepe, iste optio laudantium sed aliquam sequi.',
    }
  ]
}
