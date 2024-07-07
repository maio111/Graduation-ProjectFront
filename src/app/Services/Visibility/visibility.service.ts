import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {
  private showNavbarFooterSubject = new BehaviorSubject<boolean>(true);

  showNavbarFooter$ = this.showNavbarFooterSubject.asObservable();

  constructor() { }

  setShowNavbarFooter(show: boolean) {
    this.showNavbarFooterSubject.next(show);
  }
}
