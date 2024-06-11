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
import { RoomsDashboardComponent } from './Components/admin-dashboard/hotels-dashboard/rooms-dashboard/rooms-dashboard.component';
import { AddRoomComponent } from './Components/admin-dashboard/hotels-dashboard/rooms-dashboard/add-room/add-room.component';
import { EditRoomComponent } from './Components/admin-dashboard/hotels-dashboard/rooms-dashboard/edit-room/edit-room.component';

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
            { path: 'hotelsDashboard', component: HotelsDashboardComponent},
            { path: 'countriesDashboard', component: CountryDashboardComponent },
            { path: 'roomsDashboard/:Id', component: RoomsDashboardComponent },
            { path: 'addRoom/:hotelId', component: AddRoomComponent },
            { path: 'editRoom/:Id', component: EditRoomComponent }
        ]
    },
    { path: '**', component: PageNotFoundComponent },

];
