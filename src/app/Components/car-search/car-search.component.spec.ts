import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSearchComponent } from './car-search.component';

describe('CarSearchComponent', () => {
  let component: CarSearchComponent;
  let fixture: ComponentFixture<CarSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
