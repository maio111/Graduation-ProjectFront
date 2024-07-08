import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarphotosDashboardComponent } from './carphotos-dashboard.component';

describe('CarphotosDashboardComponent', () => {
  let component: CarphotosDashboardComponent;
  let fixture: ComponentFixture<CarphotosDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarphotosDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarphotosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
