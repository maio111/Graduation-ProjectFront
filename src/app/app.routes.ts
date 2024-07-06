import { Routes } from '@angular/router';
import { HotelBookingComponent } from './Components/hotel-booking/hotel-booking.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
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
import { FeaturesDashboardComponent } from './Components/admin-dashboard/hotels-dashboard/features-dashboard/features-dashboard.component';
import { PhotosDashboardComponent } from './Components/admin-dashboard/hotels-dashboard/photos-dashboard/photos-dashboard.component';
import { AddFeatureComponent } from './Components/admin-dashboard/hotels-dashboard/features-dashboard/add-feature/add-feature.component';
import { EditFeatureComponent } from './Components/admin-dashboard/hotels-dashboard/features-dashboard/edit-feature/edit-feature.component';
import { AddPhotoComponent } from './Components/admin-dashboard/hotels-dashboard/photos-dashboard/add-photo/add-photo.component';
import { EditPhotoComponent } from './Components/admin-dashboard/hotels-dashboard/photos-dashboard/edit-photo/edit-photo.component';
import { AddCountryComponent } from './Components/admin-dashboard/country-dashboard/add-country/add-country.component';
import { EditCountryComponent } from './Components/admin-dashboard/country-dashboard/edit-country/edit-country.component';
import { RoomtypesDashboardComponent } from './Components/admin-dashboard/roomtypes-dashboard/roomtypes-dashboard.component';
import { EditRoomTypeComponent } from './Components/admin-dashboard/roomtypes-dashboard/edit-room-type/edit-room-type.component';
import { AddRoomTypeComponent } from './Components/admin-dashboard/roomtypes-dashboard/add-room-type/add-room-type.component';
import { FeaturesDashboardGeneralComponent } from './Components/admin-dashboard/features-dashboard-general/features-dashboard-general.component';
import { AddFeatureGeneralComponent } from './Components/admin-dashboard/features-dashboard-general/add-feature-general/add-feature-general.component';
import { EditFeatureGeneralComponent } from './Components/admin-dashboard/features-dashboard-general/edit-feature-general/edit-feature-general.component';
import { CityDashboardComponent } from './Components/admin-dashboard/country-dashboard/city-dashboard/city-dashboard.component';
import { AddCityComponent } from './Components/admin-dashboard/country-dashboard/city-dashboard/add-city/add-city.component';
import { EditCityComponent } from './Components/admin-dashboard/country-dashboard/city-dashboard/edit-city/edit-city.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { HotelsearchComponent } from './Components/hotelsearch/hotelsearch.component';
import { HoteldetailsComponent } from './Components/hoteldetails/hoteldetails.component';
import { ConfirmEmailComponent } from './Components/confirm-email/confirm-email.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard/admin-dashboard.component';
import { AddAdminComponent } from './Components/admin-dashboard/admin-dashboard/add-admin/add-admin.component';
import { EditAdminComponent } from './Components/admin-dashboard/admin-dashboard/edit-admin/edit-admin.component';
import { HotelBookingsComponent } from './Components/admin-dashboard/hotel-bookings/hotel-bookings.component';
import { ReservationDetailsComponent } from './Components/reservation-details/reservation-details.component';
import { HotelPaymentComponent } from './Components/hotel-payment/hotel-payment.component';
import { adminAuthGuard } from './Guards/admin-auth.guard';
import { userAuthGuard } from './Guards/user-auth.guard';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { UserBookingsViewComponent } from './Components/user-bookings-view/user-bookings-view.component';
import { HotelsInvoicesComponent } from './Components/admin-dashboard/hotels-invoices/hotels-invoices.component';
import { CarRentalComponent } from './Components/car-rental/car-rental.component';
import { CarSearchComponent } from './Components/car-search/car-search.component';
import { CarDetailsComponent } from './Components/car-details/car-details.component';
import { HomeComponent } from './Components/home/home.component';

export const routes: Routes = [
    { path: '', component: HotelBookingComponent },
    {path:'home',component:HomeComponent} ,
    { path:'hotelBooking',component:HotelBookingComponent},
    {path:'car',component:CarRentalComponent},
    {path:'filterCar',component:CarSearchComponent},
    {path:'cardetails',component:CarDetailsComponent},
    { path: 'filterhotels', component:HotelsearchComponent},
    { path: 'hoteldetails', component:HoteldetailsComponent},
    { path: 'reservationDetails', component: ReservationDetailsComponent, canActivate: [userAuthGuard]},
    { path: 'login', component: LoginComponent ,pathMatch: 'full'},
    { path: 'register', component: RegistrationComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'confirm-email', component: ConfirmEmailComponent },
    { path: 'userBookingsView', component: UserBookingsViewComponent, canActivate: [userAuthGuard]},
    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        children: [
            { path: '', component: AdminDashboardComponent },
            { path: 'adminDashboard', component: AdminDashboardComponent },
            { path: 'addAdmin', component: AddAdminComponent },
            { path: 'editAdmin/:userName', component: EditAdminComponent },
            { path: 'hotelsDashboard', component: HotelsDashboardComponent },
            { path: 'addHotel', component: AddHotelComponent },
            { path: 'editHotel/:Id', component: EditHotelComponent },
            { path: 'detailsHotel/:Id', component: DetailsHotelComponent },
            { path: 'countriesDashboard', component: CountryDashboardComponent },
            { path: 'addCountry', component: AddCountryComponent },
            { path: 'editCountry/:Id', component: EditCountryComponent },
            { path: 'citiesDashboard/:Id', component: CityDashboardComponent },
            { path: 'addCity/:Id', component: AddCityComponent },
            { path: 'editCity/:Id', component: EditCityComponent },
            { path: 'roomsDashboard/:Id', component: RoomsDashboardComponent },
            { path: 'addRoom/:hotelId', component: AddRoomComponent },
            { path: 'editRoom/:Id', component: EditRoomComponent },
            { path: 'featuresDashboard/:Id', component: FeaturesDashboardComponent },
            { path: 'addFeature/:hotelId', component: AddFeatureComponent },
            { path: 'editFeature/:hotelId', component: EditFeatureComponent },
            { path: 'photosDashboard/:hotelId', component: PhotosDashboardComponent },
            { path: 'addPhoto/:hotelId', component: AddPhotoComponent },
            { path: 'editPhoto/:hotelId', component: EditPhotoComponent },
            { path: 'roomTypesDashboard', component: RoomtypesDashboardComponent },
            { path: 'addRoomType', component: AddRoomTypeComponent },
            { path: 'editRoomType/:Id', component: EditRoomTypeComponent },
            { path: 'featuresDashboardGeneral', component: FeaturesDashboardGeneralComponent },
            { path: 'addFeatureGeneral', component: AddFeatureGeneralComponent },
            { path: 'editFeatureGeneral/:Id', component: EditFeatureGeneralComponent },
            { path: 'hotelsBookingsDashboard', component: HotelBookingsComponent },
            { path: 'hotelInvoices', component: HotelsInvoicesComponent },

        ],
        canActivate: [adminAuthGuard]
    },
    { path: 'hotelPayment', component: HotelPaymentComponent , canActivate: [userAuthGuard]},
    { path: '**', component: PageNotFoundComponent },
    { path: 'notFound', component: PageNotFoundComponent },
];
