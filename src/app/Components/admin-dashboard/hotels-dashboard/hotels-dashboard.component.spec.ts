import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsDashboardComponent } from './hotels-dashboard.component';

describe('HotelsDashboardComponent', () => {
  let component: HotelsDashboardComponent;
  let fixture: ComponentFixture<HotelsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
