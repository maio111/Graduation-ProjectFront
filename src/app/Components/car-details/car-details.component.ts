import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MapModalForCarComponent } from '../map-modal-for-car/map-modal-for-car.component';
declare const bootstrap: any;
@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule,FormsModule,MapModalForCarComponent],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent {
  openModal1() {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
modalImageSrc: string | null = null;
openModal(imageSrc: string) {
  this.modalImageSrc = imageSrc;
}
}
