import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentalInvoicesComponent } from './car-rental-invoices.component';

describe('CarRentalInvoicesComponent', () => {
  let component: CarRentalInvoicesComponent;
  let fixture: ComponentFixture<CarRentalInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarRentalInvoicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarRentalInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
