import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { HotelBookingComponent } from './Components/hotel-booking/hotel-booking.component';

export const routes: Routes = [
    { path: '', component: HotelBookingComponent },
    { path: 'admin', component: AdminDashboardComponent }
];