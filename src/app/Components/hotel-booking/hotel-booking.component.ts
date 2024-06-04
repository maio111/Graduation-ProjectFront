import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
    selector: 'app-hotel-booking',
    standalone: true,
    templateUrl: './hotel-booking.component.html',
    styleUrl: './hotel-booking.component.css',
    imports: [NavBarComponent]
})
export class HotelBookingComponent {

}
