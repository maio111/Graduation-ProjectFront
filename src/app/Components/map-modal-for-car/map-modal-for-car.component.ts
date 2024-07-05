import { Component } from '@angular/core';
import { HotelMapComponent } from "../admin-dashboard/hotels-dashboard/hotel-map/hotel-map.component";

@Component({
    selector: 'app-map-modal-for-car',
    standalone: true,
    templateUrl: './map-modal-for-car.component.html',
    styleUrl: './map-modal-for-car.component.css',
    imports: [HotelMapComponent]
})
export class MapModalForCarComponent {
  hotelCoordinates = { latitude: 0, longitude: 0 };
}
