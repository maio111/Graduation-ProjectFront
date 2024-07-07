import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentsComponent } from './car-rents.component';

describe('CarRentsComponent', () => {
  let component: CarRentsComponent;
  let fixture: ComponentFixture<CarRentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarRentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarRentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
