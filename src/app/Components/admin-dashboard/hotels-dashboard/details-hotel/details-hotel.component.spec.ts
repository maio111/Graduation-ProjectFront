import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsHotelComponent } from './details-hotel.component';

describe('DetailsHotelComponent', () => {
  let component: DetailsHotelComponent;
  let fixture: ComponentFixture<DetailsHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsHotelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
