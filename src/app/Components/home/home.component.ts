import { Component ,OnInit, Renderer2 } from '@angular/core';
import ScrollReveal from 'scrollreveal'
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [NavBarComponent]
})
export class HomeComponent {
}
