import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';
import { HoteldetailsimgComponent } from '../hoteldetailsimg/hoteldetailsimg.component';

@Component({
  selector: 'app-hoteldetails',
  standalone: true,
  imports: [FormsModule,CommonModule,HoteldetailsimgComponent,KnobModule],
  templateUrl: './hoteldetails.component.html',
  styleUrl: './hoteldetails.component.css'
})
export class HoteldetailsComponent {
  value1!: number;
  value2!: number;
  value3!: number;
  value4!: number;
  value5!: number;
  modalImageSrc: string | null = null;
  openModal(imageSrc: string) {
    this.modalImageSrc = imageSrc;
  }
}
