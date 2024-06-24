import { Component } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import flatpickr from 'flatpickr';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger for scroll-based animations

gsap.registerPlugin(ScrollTrigger); 


@Component({
    selector: 'app-hotel-booking',
    standalone: true,
    templateUrl: './hotel-booking.component.html',
    styleUrl: './hotel-booking.component.css',
    imports: [NavBarComponent, CalendarModule, FormsModule, FooterComponent]
})
export class HotelBookingComponent {
    location: string = '';
    checkin: string = '';
    checkout: string = '';
    guests: string = '';
  constructor() { }


  onFocus(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.parentElement?.querySelector('label')?.classList.add('filled');
  }

  onBlur(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value === '') {
      input.parentElement?.querySelector('label')?.classList.remove('filled');
    }
  }

  ngAfterViewInit(): void {
    flatpickr("#checkin", {
        dateFormat: "Y-m-d"
      });
      flatpickr("#checkout", {
        dateFormat: "Y-m-d"
      });
     }
     ngOnInit(): void {
        this.swipeAnimation(".destinations", [".destinations .heading", ".destinations .content"]);
        this.galleryAnimation(".destinations .gallery", [
          ".destinations .gallery .box1",
          ".destinations .gallery .box2",
          ".destinations .gallery .box3",
          ".destinations .gallery .box4",
          ".destinations .gallery .box5"
        ]);
        this.swipeAnimation(".article", [".article .latest-article", ".article .box1", ".article .box2", ".article .box3", ".article .box4"]);
        this.scrollTriggerAnimation(".travel", [".travel .box1", ".travel .box2", ".travel .box3"]);
        this.scrollTriggerAnimation(".article", [".article .label", ".article .heading"]);
        this.galleryAnimation(".feedback .voices", [".feedback .voices .box1", ".feedback .voices .box2", ".feedback .voices .box3", ".feedback .voices .box4", ".feedback .voices .box5", ".feedback .voices .box6"]);
    this.scrollTriggerAnimation(".feedback .container", [".feedback .label", ".feedback .heading", ".feedback .paragraph"]);
      }
    
      swipeAnimation(triggerSelector: string, boxSelectors: string[]): void {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: triggerSelector,
            start: "top 50%",
            end: "top 100%",
            scrub: 3,
          },
        });
    
        boxSelectors.forEach((boxSelector) => {
          timeline.to(boxSelector, {
            x: 0,
            duration: 1,
            opacity: 1,
          });
        });
      }
    
      galleryAnimation(triggerSelector: string, boxSelectors: string[]): void {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: triggerSelector,
            start: "top 100%",
            end: "bottom 100%",
            scrub: 1,
          },
        });
    
        boxSelectors.forEach((boxSelector) => {
          timeline.to(boxSelector, {
            y: 0,
            opacity: 1,
            duration: 1,
          });
        });
      }

      scrollTriggerAnimation(triggerSelector: string, boxSelectors: string[]): void {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: triggerSelector,
            start: "top 50%",
            end: "top 80%",
            scrub: 1,
          },
        });
    
        boxSelectors.forEach((boxSelector) => {
          timeline.to(boxSelector, {
            y: 0,
            duration: 1,
            opacity: 1,
          });
        });
      }
    
       
}
