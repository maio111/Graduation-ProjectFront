import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoteldetailsimgComponent } from './hoteldetailsimg.component';

describe('HoteldetailsimgComponent', () => {
  let component: HoteldetailsimgComponent;
  let fixture: ComponentFixture<HoteldetailsimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoteldetailsimgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HoteldetailsimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
