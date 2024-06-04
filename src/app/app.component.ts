import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./Components/login/login.component";
import { NavBarComponent } from "./Components/nav-bar/nav-bar.component";
import { FlightBookingComponent } from "./Components/flight-booking/flight-booking.component";
import { RegistrationComponent } from "./Components/registration/registration.component";
import { HotelBookingComponent } from "./Components/hotel-booking/hotel-booking.component";
import { HomeComponent } from "./Components/home/home.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, LoginComponent, NavBarComponent, FlightBookingComponent, RegistrationComponent, HotelBookingComponent, HomeComponent]
})
export class AppComponent {
  title = 'graduationProject';
}
