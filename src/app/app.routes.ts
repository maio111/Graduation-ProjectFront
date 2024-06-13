import { Routes } from '@angular/router';
import { HotelBookingComponent } from './Components/hotel-booking/hotel-booking.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { AdminsDashboardComponent } from './Components/admin-dashboard/admins-dashboard/admins-dashboard.component';
import { HotelsDashboardComponent } from './Components/admin-dashboard/hotels-dashboard/hotels-dashboard.component';
import { DashboardLayoutComponent } from './Components/admin-dashboard/dashboard-layout/dashboard-layout.component';
import { LoginComponent } from './Components/login/login.component';
import { AddHotelComponent } from './Components/admin-dashboard/hotels-dashboard/add-hotel/add-hotel.component';
import { EditHotelComponent } from './Components/admin-dashboard/hotels-dashboard/edit-hotel/edit-hotel.component';
import { DetailsHotelComponent } from './Components/admin-dashboard/hotels-dashboard/details-hotel/details-hotel.component';
import { CountryDashboardComponent } from './Components/admin-dashboard/country-dashboard/country-dashboard.component';
import { EditCountryComponent } from './Components/admin-dashboard/country-dashboard/edit-country/edit-country.component';
import { AddCountryComponent } from './Components/admin-dashboard/country-dashboard/add-country/add-country.component';

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
            { path: 'countriesDashboard', component: CountryDashboardComponent },
            { path: 'addCountry', component: AddCountryComponent },
            {path:'editCountry/:Id',component:EditCountryComponent }
        ]
    },
    { path: '**', component: PageNotFoundComponent },

];
