import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
    selector: 'app-car-rental',
    standalone: true,
    templateUrl: './car-rental.component.html',
    styleUrl: './car-rental.component.css',
    imports: [NavBarComponent]
})
export class CarRentalComponent {

}
