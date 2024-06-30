import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelPaymentComponent } from './hotel-payment.component';

describe('HotelPaymentComponent', () => {
  let component: HotelPaymentComponent;
  let fixture: ComponentFixture<HotelPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
