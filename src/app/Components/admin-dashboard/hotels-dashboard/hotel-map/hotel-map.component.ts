import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { GoogleMap, GoogleMapsModule} from '@angular/google-maps';

@Component({
  selector: 'app-hotel-map',
  standalone: true,
  imports: [GoogleMap, GoogleMapsModule],
  templateUrl: './hotel-map.component.html',
  styleUrls: ['./hotel-map.component.css']
})
export class HotelMapComponent implements OnInit {
  @Input() hotel!: { latitude: number; longitude: number };
  @Output() coordinatesChange = new EventEmitter<{ latitude: number; longitude: number }>();

  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;
  markerPosition!: google.maps.LatLngLiteral;

  ngOnInit(): void {
    if (this.hotel) {
      this.center = {
        lat: this.hotel.latitude,
        lng: this.hotel.longitude
      };
      this.markerPosition = { ...this.center };
    }
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.hotel.latitude = event.latLng.lat();
      this.hotel.longitude = event.latLng.lng();
      this.markerPosition = {
        lat: this.hotel.latitude,
        lng: this.hotel.longitude
      };
      this.coordinatesChange.emit({ latitude: this.hotel.latitude, longitude: this.hotel.longitude });
    }
  }
}
