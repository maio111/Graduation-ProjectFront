import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-flight-booking',
    standalone: true,
    templateUrl: './flight-booking.component.html',
    styleUrl: './flight-booking.component.css',
    imports: [NavBarComponent, FooterComponent]
})
export class FlightBookingComponent {

}
