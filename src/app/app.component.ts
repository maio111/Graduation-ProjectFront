import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./Components/login/login.component";
import { NavBarComponent } from "./Components/nav-bar/nav-bar.component";
import { RegistrationComponent } from "./Components/registration/registration.component";
import { HotelBookingComponent } from "./Components/hotel-booking/hotel-booking.component";
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './Components/footer/footer.component';
import { CountryDashboardComponent } from './Components/admin-dashboard/country-dashboard/country-dashboard.component';
import { GoogleMapsModule, GoogleMap } from '@angular/google-maps';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { HotelsearchComponent } from "./Components/hotelsearch/hotelsearch.component";
import { HoteldetailsComponent } from "./Components/hoteldetails/hoteldetails.component";
import { HoteldetailsimgComponent } from './Components/hoteldetailsimg/hoteldetailsimg.component';
import { HotelMapComponent } from './Components/admin-dashboard/hotels-dashboard/hotel-map/hotel-map.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { CarRentalComponent } from './Components/car-rental/car-rental.component';
import { CarSearchComponent } from './Components/car-search/car-search.component';
import { CarDetailsComponent } from './Components/car-details/car-details.component';
import { WishlistComponent } from "./Components/wishlist/wishlist.component";
import { CarRentalInvoicesComponent } from './Components/admin-dashboard/car-rental-invoices/car-rental-invoices.component';

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
        HotelMapComponent,
        ContactUsComponent,
        AboutUsComponent,
        FooterComponent,
        HotelBookingComponent,
        CountryDashboardComponent,
        GoogleMapsModule,
        GoogleMap,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NgxPaginationModule,
        HotelsearchComponent,
        HoteldetailsComponent,
        HoteldetailsimgComponent, CarRentalComponent, CarSearchComponent, CarDetailsComponent, WishlistComponent,CarRentalInvoicesComponent]
})
export class AppComponent {
  title = 'Booking Boo';

}
