import { Component , ViewChild, ElementRef} from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import flatpickr from 'flatpickr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarRentalHeaderComponent } from "../car-rental-header/car-rental-header.component";

@Component({
    selector: 'app-car-rental',
    standalone: true,
    templateUrl: './car-rental.component.html',
    styleUrl: './car-rental.component.css',
    imports: [NavBarComponent, CommonModule, FormsModule, CarRentalHeaderComponent]
})
export class CarRentalComponent {
    @ViewChild('checkInInput') checkInInput!: ElementRef;
    @ViewChild('checkOutInput') checkOutInput!: ElementRef;
    @ViewChild('pickUpTimeInput') pickUpTimeInput!: ElementRef;
    @ViewChild('dropOffTimeInput') dropOffTimeInput!: ElementRef;
  
    ngAfterViewInit() {
      flatpickr(this.checkInInput.nativeElement, {
        dateFormat: 'Y-m-d',
        onOpen: () => {
          this.checkInInput.nativeElement.nextElementSibling.classList.add('focused');
        },
        onClose: () => {
          if (!this.checkInInput.nativeElement.value) {
            this.checkInInput.nativeElement.nextElementSibling.classList.remove('focused');
          }
        }
      });
  
      flatpickr(this.checkOutInput.nativeElement, {
        dateFormat: 'Y-m-d',
        onOpen: () => {
          this.checkOutInput.nativeElement.nextElementSibling.classList.add('focused');
        },
        onClose: () => {
          if (!this.checkOutInput.nativeElement.value) {
            this.checkOutInput.nativeElement.nextElementSibling.classList.remove('focused');
          }
        }
      });
  
      flatpickr(this.pickUpTimeInput.nativeElement, {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        time_24hr: true,
        onOpen: () => {
          this.pickUpTimeInput.nativeElement.nextElementSibling.classList.add('focused');
        },
        onClose: () => {
          if (!this.pickUpTimeInput.nativeElement.value) {
            this.pickUpTimeInput.nativeElement.nextElementSibling.classList.remove('focused');
          }
        }
      });
  
      flatpickr(this.dropOffTimeInput.nativeElement, {
        enableTime: true,
        noCalendar: true,
        dateFormat: 'H:i',
        time_24hr: true,
        onOpen: () => {
          this.dropOffTimeInput.nativeElement.nextElementSibling.classList.add('focused');
        },
        onClose: () => {
          if (!this.dropOffTimeInput.nativeElement.value) {
            this.dropOffTimeInput.nativeElement.nextElementSibling.classList.remove('focused');
          }
        }
      });
    }
  
}
