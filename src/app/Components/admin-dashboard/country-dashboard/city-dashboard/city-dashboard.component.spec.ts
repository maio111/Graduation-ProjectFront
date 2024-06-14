import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityDashboardComponent } from './city-dashboard.component';

describe('CityDashboardComponent', () => {
  let component: CityDashboardComponent;
  let fixture: ComponentFixture<CityDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
