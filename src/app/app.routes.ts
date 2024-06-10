import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CarRentalComponent } from './Components/car-rental/car-rental.component';
import { HotelBookingComponent } from './Components/hotel-booking/hotel-booking.component';

export const routes: Routes = [
    {"path":"",component:HomeComponent},
    {"path":"home",component:HomeComponent},
    {"path":"car",component:CarRentalComponent},
    {"path":"hotel",component:HotelBookingComponent}
];
