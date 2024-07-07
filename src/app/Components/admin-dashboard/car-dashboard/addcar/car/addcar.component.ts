import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    modelOfYear: null,
    brand: '',
    rentPrice: null,
    availabilityStatus: true,
    plateNumber: '',
    description: '',
    insuranceIncluded: true,
    gearType: null,
    gasType: null,
    numberOfSeats: null,
    agencyId: null
  };

  gearTypes = [
    { id: 1, name: 'Automatic' },
    { id: 2, name: 'Manual' }
  ];

  gasTypes = [
    { id: 1, name: 'Petrol' },
    { id: 2, name: 'Diesel' },
    { id: 3, name: 'Electric' },
    { id: 4, name: 'Hybrid' }
  ];

  constructor(
    private carService: CarService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Params:', params); // Log to check params
      const agencyIdFromRoute = +params['id']; // Convert to number
      console.log('Agency ID from Route:', agencyIdFromRoute); // Log to check agencyIdFromRoute
      this.car.agencyId = agencyIdFromRoute; // Assign agencyId to car object
  
  
      console.log(this.car.agencyId)
    });
  }


  addCar() {
    this.carService.addCar(this.car).subscribe({
      next: res => {
        this.router.navigate(['dashboard/cars', this.car.agencyId]);
      },
      error: err => {
        console.error('Error adding car:', err);
        // Handle specific validation errors if needed
      }
    });
  }

  onCancel() {
    this.router.navigate(['dashboard/cars', this.car.agencyId]);
  }
}