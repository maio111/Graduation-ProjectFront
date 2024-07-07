import { Component } from '@angular/core';
import { CarService } from '../../../../../Services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-editcar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './editcar.component.html',
  styleUrl: './editcar.component.css'
})
export class EditcarComponent {

  carId!: number; // Initialize carId as a class property

  car: any = {
    modelOfYear: '',
    brand: '',
    rentPrice: 0,
    availabilityStatus: false,
    plateNumber: '',
    description: '',
    insuranceIncluded: false,
    gearType: '',
    gasType: '',
    numberOfSeats: 0
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.carId = +params['id']; 
      this.getCarDetails(); 
    });
  }
  getCarDetails() {
    this.carService.getCarById(this.carId).subscribe({
      next: (res: any) => {
        this.car = res.data;
        console.log(this.car)
      },
      error: (error) => {
        console.error('Error fetching car details:', error);
      }
    });
  }

  updateCar() {
    this.carService.updateCar(this.carId, this.car).subscribe({
      next: (res: any) => {
        console.log('Car updated successfully:', res);
        this.router.navigate(['/dashboard/cars',this.car.agencyId ]);
      },
      error: (error) => {
        console.error('Error updating car:', error);
      }
    });
  }

  cancel() {
    this.router.navigate(['/dashboard/cars',this.car.agencyId ]);
  }
}