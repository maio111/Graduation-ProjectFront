import { Component ,NgModule,OnInit, Renderer2 } from '@angular/core';
import ScrollReveal from 'scrollreveal'
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Router } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [NavBarComponent ,FormsModule, CommonModule]
})
export class HomeComponent {
   constructor(private router:Router){}
   toHotel(){
    this.router.navigate(['/hotelBooking']);
   }
   toCar(){
    this.router.navigate(['/car']);
   }
 
}
