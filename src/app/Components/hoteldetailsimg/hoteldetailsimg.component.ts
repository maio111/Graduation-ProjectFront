import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-hoteldetailsimg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hoteldetailsimg.component.html',
  styleUrl: './hoteldetailsimg.component.css'
})
export class HoteldetailsimgComponent {
  @Input() imageSrc: string | null = null;

  closeModal() {
    this.imageSrc = null;
  }
}
