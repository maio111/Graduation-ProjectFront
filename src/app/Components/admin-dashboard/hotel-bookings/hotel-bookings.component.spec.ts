import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBookingsComponent } from './hotel-bookings.component';

describe('HotelBookingsComponent', () => {
  let component: HotelBookingsComponent;
  let fixture: ComponentFixture<HotelBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelBookingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
