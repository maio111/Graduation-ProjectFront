import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./Components/login/login.component";
import { NavBarComponent } from "./Components/nav-bar/nav-bar.component";
import { RegistrationComponent } from "./Components/registration/registration.component";
import { HotelBookingComponent } from "./Components/hotel-booking/hotel-booking.component";
<<<<<<< HEAD
import { FooterComponent } from "./Components/footer/footer.component";
import { RouterModule} from '@angular/router';
import { AdminsDashboardComponent } from './Components/admin-dashboard/admins-dashboard/admins-dashboard.component';
import { HotelsDashboardComponent } from './Components/admin-dashboard/hotels-dashboard/hotels-dashboard.component';
import { CountriesDashboardComponent } from './Components/admin-dashboard/countries-dashboard/countries-dashboard.component';
=======
import { HomeComponent } from "./Components/home/home.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LoginService } from './Services/Login/login.service';

>>>>>>> 7083f9023aad2c9e752a09b5ff05907c13215893
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
<<<<<<< HEAD
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
=======
    imports: [RouterOutlet, LoginComponent, NavBarComponent, FlightBookingComponent, RegistrationComponent, HotelBookingComponent, HomeComponent,
      HttpClientModule,
      FormsModule]
>>>>>>> 7083f9023aad2c9e752a09b5ff05907c13215893
})
export class AppComponent {
  title = 'Booking Boo';
}
