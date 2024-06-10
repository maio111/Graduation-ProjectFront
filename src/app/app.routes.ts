import { Routes } from '@angular/router';
<<<<<<< HEAD
import { HotelBookingComponent } from './Components/hotel-booking/hotel-booking.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { AdminsDashboardComponent } from './Components/admin-dashboard/admins-dashboard/admins-dashboard.component';
import { HotelsDashboardComponent } from './Components/admin-dashboard/hotels-dashboard/hotels-dashboard.component';
import { CountriesDashboardComponent } from './Components/admin-dashboard/countries-dashboard/countries-dashboard.component';
import { DashboardLayoutComponent } from './Components/admin-dashboard/dashboard-layout/dashboard-layout.component';
import { LoginComponent } from './Components/login/login.component';
import { AddHotelComponent } from './Components/admin-dashboard/hotels-dashboard/add-hotel/add-hotel.component';
import { EditHotelComponent } from './Components/admin-dashboard/hotels-dashboard/edit-hotel/edit-hotel.component';
import { DetailsHotelComponent } from './Components/admin-dashboard/hotels-dashboard/details-hotel/details-hotel.component';

export const routes: Routes = [
    { path: '', component: HotelBookingComponent }, 
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        children: [
            { path: '', component: AdminsDashboardComponent },
            { path: 'adminsDashboard', component: AdminsDashboardComponent },
            { path: 'addHotel', component: AddHotelComponent },
            { path: 'editHotel/:Id', component: EditHotelComponent },
            { path: 'detailsHotel/:Id', component: DetailsHotelComponent },
            {path: 'hotelsDashboard', component: HotelsDashboardComponent},
            { path: 'countriesDashboard', component: CountriesDashboardComponent },
        ]
    },
    { path: '**', component: PageNotFoundComponent },

];
=======
import { HomeComponent } from './Components/home/home.component';
import { CarRentalComponent } from './Components/car-rental/car-rental.component';
import { HotelBookingComponent } from './Components/hotel-booking/hotel-booking.component';

export const routes: Routes = [
    {"path":"",component:HomeComponent},
    {"path":"home",component:HomeComponent},
    {"path":"car",component:CarRentalComponent},
    {"path":"hotel",component:HotelBookingComponent}
];
>>>>>>> 7083f9023aad2c9e752a09b5ff05907c13215893
