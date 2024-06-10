import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./Components/login/login.component";
import { NavBarComponent } from "./Components/nav-bar/nav-bar.component";
import { RegistrationComponent } from "./Components/registration/registration.component";
import { HotelBookingComponent } from "./Components/hotel-booking/hotel-booking.component";
import { FooterComponent } from "./Components/footer/footer.component";
import { RouterModule} from '@angular/router';
import { AdminsDashboardComponent } from './Components/admin-dashboard/admins-dashboard/admins-dashboard.component';
import { HotelsDashboardComponent } from './Components/admin-dashboard/hotels-dashboard/hotels-dashboard.component';
import { CountriesDashboardComponent } from './Components/admin-dashboard/countries-dashboard/countries-dashboard.component';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
  imports: [RouterModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LoginComponent,
    NavBarComponent,
    RegistrationComponent,
    HotelBookingComponent,
    FooterComponent,
    AdminsDashboardComponent,
    HotelsDashboardComponent,
    CountriesDashboardComponent,
  ]
})
export class AppComponent {
  title = 'Booking Boo';
}
