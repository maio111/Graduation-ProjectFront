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

  car: any = {
    id: 0,
    modelOfYear: 0,
    brand: '',
    rentPrice: 0,
    availabilityStatus: false,
    insuranceIncluded: false,
    gearType: 0,
    numberOfSeats: 0
  };
  carId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.carId = +params['id']; 
      this.loadCarAgency();
    });
  }

  loadCarAgency() {
    this.carService.getCaryById(this.carId).subscribe({
      next: (res: any) => {
        this.car = res.data; 
      },
      error: (error) => {
        console.error('Error fetching car:', error);
      }
    });
  }

  onSubmit() {
    this.carService.updateCar(this.carId, this.car).subscribe({
      next: (res: any) => {
        console.log('Car agency updated successfully:', res);
        this.router.navigate(['/dashboard/car']);
      },
      error: (error) => {
        console.error('Error updating car:', error);
      }
    });
  }
  
  onCancel() {
    this.router.navigate(['/dashboard/car']); 
  }
}
