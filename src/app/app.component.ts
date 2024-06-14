import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./Components/login/login.component";
import { NavBarComponent } from "./Components/nav-bar/nav-bar.component";
import { RegistrationComponent } from "./Components/registration/registration.component";
import { HotelBookingComponent } from "./Components/hotel-booking/hotel-booking.component";
import { HomeComponent } from "./Components/home/home.component";
import { HttpClientModule } from '@angular/common/http';
import { FormControl, NgForm} from '@angular/forms';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { LoginService } from './Services/Login/login.service';
import { FooterComponent } from './Components/footer/footer.component';
import { AdminsDashboardComponent } from './Components/admin-dashboard/admins-dashboard/admins-dashboard.component';
import { CountryDashboardComponent } from './Components/admin-dashboard/country-dashboard/country-dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    HotelBookingComponent,
    CountryDashboardComponent,
    GoogleMapsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    

  ]
})
export class AppComponent {
  title = 'Booking Boo';
}
