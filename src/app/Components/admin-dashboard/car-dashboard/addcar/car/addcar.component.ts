import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarService } from '../../../../../Services/car.service';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addcar.component.html',
  styleUrl: './addcar.component.css'
})
export class addCarComponent {
  car: any = {
    modelOfYear: 0,
    brand: '',
    rentPrice: 0,
    availabilityStatus: true,
    plateNumber: '',
    insuranceIncluded: true,
    gearType: 0,
    numberOfSeats: 0
  };

  constructor(private carService: CarService, private router: Router) {}

  addCar() {
    this.carService.createCar(this.car).subscribe({
      next: res => {
        this.router.navigate(['dashboard/car']); 
      },
      error: err => {
        console.error('Error adding car:', err);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/dashboard/car']); 
  }
}  