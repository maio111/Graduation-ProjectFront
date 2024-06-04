import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-hotel-booking',
    standalone: true,
    templateUrl: './hotel-booking.component.html',
    styleUrl: './hotel-booking.component.css',
    imports: [NavBarComponent,CalendarModule,FormsModule]
})
export class HotelBookingComponent {
   
}
