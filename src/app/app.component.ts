import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./Components/login/login.component";
import { NavBarComponent } from "./Components/nav-bar/nav-bar.component";
import { FlightBookingComponent } from "./Components/flight-booking/flight-booking.component";
import { RegistrationComponent } from "./Components/registration/registration.component";
import { HotelBookingComponent } from "./Components/hotel-booking/hotel-booking.component";
import { FooterComponent } from "./Components/footer/footer.component";
import { RouterModule} from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterModule,RouterOutlet, LoginComponent, NavBarComponent, FlightBookingComponent, RegistrationComponent, HotelBookingComponent, FooterComponent]
})
export class AppComponent {
  title = 'Booking Boo';
}
